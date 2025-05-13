import path from "path";
import { fileURLToPath } from "url";
import express, { type Request, Response, NextFunction, type Express as ExpressApp } from "express";
import { registerRoutes } from "./routes";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let logger = console.log; // Default logger, can be overridden by Vite's logger in dev

app.use((req, res, next) => {
  const start = Date.now();
  const reqPath = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (reqPath.startsWith("/api")) {
      let logLine = `${req.method} ${reqPath} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      logger(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  // Error handling middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.error("Error handling request:", err.stack || err.message || err);
    if (!res.headersSent) {
      res.status(status).json({ message });
    }
  });

  if (process.env.NODE_ENV === "development") {
    try {
      const vitePackage = await import("vite");
      const viteDevServer = await vitePackage.createServer({
        server: { middlewareMode: true, hmr: { server } }, // 'server' is the http.Server instance from registerRoutes
        appType: 'custom',
      });
      app.use(viteDevServer.middlewares);

      // Use Vite's logger if available
      if (viteDevServer.config.logger && typeof viteDevServer.config.logger.info === 'function') {
        logger = viteDevServer.config.logger.info; 
      }
      logger("Vite dev server configured and running.");
    } catch (e) {
      console.error("Failed to setup Vite for development:", e);
      logger = console.log; // Fallback to console.log
      logger("Vite setup failed, continuing with standard logging.");
      // Consider if static serving is needed here as a fallback if Vite fully fails
    }
  } else { // Production or other environments
    const prodServeStatic = (expressApp: ExpressApp) => {
      const clientDistPublic = path.resolve(__dirname, "public");
      const clientIndex = path.resolve(clientDistPublic, "index.html");

      expressApp.use(express.static(clientDistPublic));
      expressApp.get("*", (_req_prod, res_prod) => {
        res_prod.sendFile(clientIndex, (err_sendFile) => {
          if (err_sendFile) {
            console.error("Error sending index.html:", err_sendFile);
            if (!res_prod.headersSent) {
              // Check if it's an API-like path, which shouldn't serve index.html
              if (!_req_prod.path.startsWith("/api/")) {
                 res_prod.status(404).json({ message: "Client entry point not found or error serving file." });
              } else {
                // For API routes that fell through, ensure 404 if not handled by router
                res_prod.status(404).json({ message: "API endpoint not found."}) ;
              }
            }
          }
        });
      });
    };
    prodServeStatic(app);
    logger("Static files configured for production.");
  }

  // Fallback for any routes not handled yet (e.g. API routes that don't match)
  app.use((_req, res, _next) => {
    if (!res.headersSent) {
        // This will catch requests that didn't match API routes and weren't caught by SPA's '*' static handler
        res.status(404).json({ message: "Resource not found." });
    }
  });

  const port = 5001;
  server.listen({
    port,
    host: "0.0.0.0",
  }, () => {
    logger(`Serving on port ${port}`);
  });
})().catch(err => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
