// server/index.ts
import path from "path";
import { fileURLToPath } from "url";
import express from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  registrationsList;
  currentUserId;
  currentRegistrationId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.registrationsList = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentRegistrationId = 1;
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Registration methods
  async createRegistration(registration) {
    const id = this.currentRegistrationId++;
    const createdAt = (/* @__PURE__ */ new Date()).toISOString();
    const newRegistration = {
      ...registration,
      id,
      createdAt
    };
    this.registrationsList.set(id, newRegistration);
    return newRegistration;
  }
  async getRegistrations() {
    return Array.from(this.registrationsList.values());
  }
  async getRegistrationByPhone(phone) {
    return Array.from(this.registrationsList.values()).find(
      (registration) => registration.phone === phone
    );
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var registrations = pgTable("registrations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  university: text("university"),
  userType: text("user_type").notNull(),
  // 'user' or 'chamber'
  createdAt: text("created_at").notNull()
});
var insertRegistrationSchema = createInsertSchema(registrations).pick({
  name: true,
  phone: true,
  email: true,
  university: true,
  userType: true
});

// server/routes.ts
import { z } from "zod";
async function registerRoutes(app2) {
  app2.post("/api/register", async (req, res) => {
    try {
      const registrationData = await insertRegistrationSchema.parse({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email || null,
        university: req.body.university || null,
        userType: req.body.userType
      });
      const existingRegistration = await storage.getRegistrationByPhone(registrationData.phone);
      if (existingRegistration) {
        return res.status(409).json({
          message: "Ya existe un registro con este n\xFAmero de tel\xE9fono."
        });
      }
      const registration = await storage.createRegistration(registrationData);
      return res.status(201).json({
        message: "Registro exitoso",
        data: {
          id: registration.id,
          name: registration.name,
          userType: registration.userType
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Datos inv\xE1lidos",
          errors: error.errors
        });
      }
      console.error("Error registering:", error);
      return res.status(500).json({
        message: "Error interno del servidor"
      });
    }
  });
  app2.get("/api/registrations", async (req, res) => {
    try {
      const registrations2 = await storage.getRegistrations();
      return res.status(200).json({
        data: registrations2
      });
    } catch (error) {
      console.error("Error fetching registrations:", error);
      return res.status(500).json({
        message: "Error interno del servidor"
      });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/index.ts
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
var logger = console.log;
app.use((req, res, next) => {
  const start = Date.now();
  const reqPath = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
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
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      logger(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.error("Error handling request:", err.stack || err.message || err);
    if (!res.headersSent) {
      res.status(status).json({ message });
    }
  });
  if (production === "development") {
    try {
      const vitePackage = await import("vite");
      const viteDevServer = await vitePackage.createServer({
        server: { middlewareMode: true, hmr: { server } },
        // 'server' is the http.Server instance from registerRoutes
        appType: "custom"
      });
      app.use(viteDevServer.middlewares);
      if (viteDevServer.config.logger && typeof viteDevServer.config.logger.info === "function") {
        logger = viteDevServer.config.logger.info;
      }
      logger("Vite dev server configured and running.");
    } catch (e) {
      console.error("Failed to setup Vite for development:", e);
      logger = console.log;
      logger("Vite setup failed, continuing with standard logging.");
    }
  } else {
    const prodServeStatic = (expressApp) => {
      const clientDistPublic = path.resolve(__dirname, "public");
      const clientIndex = path.resolve(clientDistPublic, "index.html");
      expressApp.use(express.static(clientDistPublic));
      expressApp.get("*", (_req_prod, res_prod) => {
        res_prod.sendFile(clientIndex, (err_sendFile) => {
          if (err_sendFile) {
            console.error("Error sending index.html:", err_sendFile);
            if (!res_prod.headersSent) {
              if (!_req_prod.path.startsWith("/api/")) {
                res_prod.status(404).json({ message: "Client entry point not found or error serving file." });
              } else {
                res_prod.status(404).json({ message: "API endpoint not found." });
              }
            }
          }
        });
      });
    };
    prodServeStatic(app);
    logger("Static files configured for production.");
  }
  app.use((_req, res, _next) => {
    if (!res.headersSent) {
      res.status(404).json({ message: "Resource not found." });
    }
  });
  const port = 5001;
  server.listen({
    port,
    host: "0.0.0.0"
  }, () => {
    logger(`Serving on port ${port}`);
  });
})().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
