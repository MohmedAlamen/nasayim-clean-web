import { decimal, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Chat conversations table for storing customer support conversations
 */
export const conversations = mysqlTable("conversations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  supportAgentId: int("supportAgentId"),
  subject: varchar("subject", { length: 255 }).notNull(),
  status: mysqlEnum("status", ["open", "closed", "pending"]).default("open").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Conversation = typeof conversations.$inferSelect;
export type InsertConversation = typeof conversations.$inferInsert;

/**
 * Chat messages table for storing individual messages
 */
export const chatMessages = mysqlTable("chatMessages", {
  id: int("id").autoincrement().primaryKey(),
  conversationId: int("conversationId").notNull(),
  senderId: int("senderId").notNull(),
  senderRole: mysqlEnum("senderRole", ["customer", "support", "admin"]).notNull(),
  message: text("message").notNull(),
  isRead: mysqlEnum("isRead", ["true", "false"]).default("false").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = typeof chatMessages.$inferInsert;

/**
 * Ratings and reviews table for customer feedback
 */
export const ratings = mysqlTable("ratings", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("orderId").notNull(),
  customerId: int("customerId").notNull(),
  technicianId: int("technicianId"),
  rating: int("rating").notNull(), // 1-5 stars
  review: text("review"),
  serviceQuality: int("serviceQuality"), // 1-5
  punctuality: int("punctuality"), // 1-5
  professionalism: int("professionalism"), // 1-5
  isVerified: mysqlEnum("isVerified", ["true", "false"]).default("false").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Rating = typeof ratings.$inferSelect;
export type InsertRating = typeof ratings.$inferInsert;

/**
 * Promotions and discounts table
 */
export const promotions = mysqlTable("promotions", {
  id: int("id").autoincrement().primaryKey(),
  code: varchar("code", { length: 50 }).notNull().unique(),
  description: text("description"),
  discountType: mysqlEnum("discountType", ["percentage", "fixed"]).notNull(),
  discountValue: varchar("discountValue", { length: 10 }).notNull(),
  maxUses: int("maxUses"),
  currentUses: int("currentUses").default(0),
  minOrderAmount: varchar("minOrderAmount", { length: 10 }),
  validFrom: timestamp("validFrom").notNull(),
  validUntil: timestamp("validUntil").notNull(),
  isActive: mysqlEnum("isActive", ["true", "false"]).default("true").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Promotion = typeof promotions.$inferSelect;
export type InsertPromotion = typeof promotions.$inferInsert;

/**
 * Subscription plans table
 */
export const subscriptionPlans = mysqlTable("subscriptionPlans", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  monthlyPrice: varchar("monthlyPrice", { length: 10 }).notNull(),
  annualPrice: varchar("annualPrice", { length: 10 }),
  servicesIncluded: int("servicesIncluded").notNull(), // Number of services per month
  discountPercentage: int("discountPercentage").default(0),
  features: text("features"), // JSON array of features
  isActive: mysqlEnum("isActive", ["true", "false"]).default("true").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SubscriptionPlan = typeof subscriptionPlans.$inferSelect;
export type InsertSubscriptionPlan = typeof subscriptionPlans.$inferInsert;

/**
 * Customer subscriptions table
 */
export const customerSubscriptions = mysqlTable("customerSubscriptions", {
  id: int("id").autoincrement().primaryKey(),
  customerId: int("customerId").notNull(),
  planId: int("planId").notNull(),
  status: mysqlEnum("status", ["active", "paused", "cancelled"]).default("active").notNull(),
  startDate: timestamp("startDate").notNull(),
  renewalDate: timestamp("renewalDate").notNull(),
  billingCycle: mysqlEnum("billingCycle", ["monthly", "annual"]).notNull(),
  servicesUsed: int("servicesUsed").default(0),
  autoRenew: mysqlEnum("autoRenew", ["true", "false"]).default("true").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CustomerSubscription = typeof customerSubscriptions.$inferSelect;
export type InsertCustomerSubscription = typeof customerSubscriptions.$inferInsert;

/**
 * Technician location tracking table
 */
export const technicianTracking = mysqlTable("technicianTracking", {
  id: int("id").autoincrement().primaryKey(),
  technicianId: int("technicianId").notNull(),
  orderId: int("orderId"),
  latitude: varchar("latitude", { length: 20 }).notNull(),
  longitude: varchar("longitude", { length: 20 }).notNull(),
  accuracy: int("accuracy"), // GPS accuracy in meters
  status: mysqlEnum("status", ["available", "en_route", "on_site", "completed"]).notNull(),
  eta: timestamp("eta"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type TechnicianTracking = typeof technicianTracking.$inferSelect;
export type InsertTechnicianTracking = typeof technicianTracking.$inferInsert;