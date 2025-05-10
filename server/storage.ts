import { users, type User, type InsertUser, registrations, type Registration, type InsertRegistration } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Registration methods
  createRegistration(registration: InsertRegistration): Promise<Registration>;
  getRegistrations(): Promise<Registration[]>;
  getRegistrationByPhone(phone: string): Promise<Registration | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private registrationsList: Map<number, Registration>;
  
  currentUserId: number;
  currentRegistrationId: number;

  constructor() {
    this.users = new Map();
    this.registrationsList = new Map();
    this.currentUserId = 1;
    this.currentRegistrationId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Registration methods
  async createRegistration(registration: InsertRegistration): Promise<Registration> {
    const id = this.currentRegistrationId++;
    const createdAt = new Date().toISOString();
    
    const newRegistration: Registration = { 
      ...registration, 
      id,
      createdAt
    };
    
    this.registrationsList.set(id, newRegistration);
    return newRegistration;
  }
  
  async getRegistrations(): Promise<Registration[]> {
    return Array.from(this.registrationsList.values());
  }
  
  async getRegistrationByPhone(phone: string): Promise<Registration | undefined> {
    return Array.from(this.registrationsList.values()).find(
      (registration) => registration.phone === phone,
    );
  }
}

export const storage = new MemStorage();
