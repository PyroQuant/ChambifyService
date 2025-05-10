import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRegistrationSchema } from "@shared/schema";
import { z } from "zod";
import { ZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Registration API endpoint
  app.post("/api/register", async (req: Request, res: Response) => {
    try {
      // Validate the request body against our schema
      const registrationData = await insertRegistrationSchema.parse({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email || null,
        university: req.body.university || null,
        userType: req.body.userType,
      });
      
      // Check if user with this phone already exists
      const existingRegistration = await storage.getRegistrationByPhone(registrationData.phone);
      
      if (existingRegistration) {
        return res.status(409).json({ 
          message: "Ya existe un registro con este número de teléfono."
        });
      }
      
      // Create registration
      const registration = await storage.createRegistration(registrationData);
      
      // Return success
      return res.status(201).json({
        message: "Registro exitoso",
        data: {
          id: registration.id,
          name: registration.name,
          userType: registration.userType,
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Datos inválidos", 
          errors: error.errors 
        });
      }
      
      console.error("Error registering:", error);
      return res.status(500).json({ 
        message: "Error interno del servidor"
      });
    }
  });

  // GET registrations (for testing/admin purposes)
  app.get("/api/registrations", async (req: Request, res: Response) => {
    try {
      const registrations = await storage.getRegistrations();
      return res.status(200).json({ 
        data: registrations 
      });
    } catch (error) {
      console.error("Error fetching registrations:", error);
      return res.status(500).json({ 
        message: "Error interno del servidor"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
