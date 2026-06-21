import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  workspaces: defineTable({
    name: v.string(),
    slug: v.string(),
    plan: v.union(v.literal("solo"), v.literal("studio"), v.literal("business")),
    createdAt: v.number(),
    yocoSubscriptionId: v.optional(v.string()),
    yocoCustomerId: v.optional(v.string()),
    settings: v.object({
      currency: v.string(),
      timezone: v.string(),
      vatRate: v.number(),
    }),
  }).index("by_slug", ["slug"]),

  users: defineTable({
    email: v.string(),
    name: v.string(),
    role: v.union(v.literal("admin"), v.literal("member")),
    workspaceId: v.id("workspaces"),
    avatarUrl: v.optional(v.string()),
    lastActiveAt: v.number(),
  }).index("by_workspace", ["workspaceId"])
    .index("by_email", ["email"]),

  contacts: defineTable({
    workspaceId: v.id("workspaces"),
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
    status: v.union(v.literal("lead"), v.literal("prospect"), v.literal("client")),
    stage: v.union(v.literal("new"), v.literal("contacted"), v.literal("qualified"), v.literal("proposal"), v.literal("won"), v.literal("lost")),
    dealValue: v.number(),
    tags: v.array(v.string()),
    notes: v.string(),
    avatarUrl: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_workspace", ["workspaceId"])
    .index("by_status", ["workspaceId", "status"])
    .index("by_stage", ["workspaceId", "stage"]),

  invoices: defineTable({
    workspaceId: v.id("workspaces"),
    contactId: v.id("contacts"),
    number: v.string(),
    status: v.union(v.literal("draft"), v.literal("sent"), v.literal("paid"), v.literal("overdue"), v.literal("cancelled")),
    items: v.array(v.object({
      description: v.string(),
      quantity: v.number(),
      unitPrice: v.number(),
      total: v.number(),
    })),
    subtotal: v.number(),
    tax: v.number(),
    total: v.number(),
    currency: v.string(),
    issuedAt: v.optional(v.number()),
    dueAt: v.optional(v.number()),
    paidAt: v.optional(v.number()),
    yocoPaymentId: v.optional(v.string()),
    recurring: v.optional(v.object({
      frequency: v.union(v.literal("weekly"), v.literal("monthly"), v.literal("quarterly")),
      nextDate: v.number(),
    })),
    createdAt: v.number(),
  }).index("by_workspace", ["workspaceId"])
    .index("by_contact", ["contactId"])
    .index("by_status", ["workspaceId", "status"]),

  projects: defineTable({
    workspaceId: v.id("workspaces"),
    contactId: v.optional(v.id("contacts")),
    name: v.string(),
    description: v.string(),
    status: v.union(v.literal("planning"), v.literal("active"), v.literal("completed"), v.literal("on-hold")),
    budget: v.number(),
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
    createdAt: v.number(),
  }).index("by_workspace", ["workspaceId"])
    .index("by_status", ["workspaceId", "status"]),

  tasks: defineTable({
    projectId: v.id("projects"),
    title: v.string(),
    description: v.optional(v.string()),
    assigneeId: v.optional(v.id("users")),
    status: v.union(v.literal("todo"), v.literal("in-progress"), v.literal("done")),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high"), v.literal("urgent")),
    dueDate: v.optional(v.number()),
    timeTracking: v.object({
      estimated: v.number(),
      logged: v.number(),
    }),
    createdAt: v.number(),
  }).index("by_project", ["projectId"])
    .index("by_assignee", ["assigneeId"]),

  clientPortals: defineTable({
    workspaceId: v.id("workspaces"),
    contactId: v.id("contacts"),
    token: v.string(),
    access: v.object({
      invoices: v.boolean(),
      projects: v.boolean(),
      documents: v.boolean(),
    }),
    lastAccessedAt: v.optional(v.number()),
    createdAt: v.number(),
  }).index("by_workspace", ["workspaceId"])
    .index("by_token", ["token"]),

  automationRules: defineTable({
    workspaceId: v.id("workspaces"),
    name: v.string(),
    trigger: v.union(v.literal("new-lead"), v.literal("invoice-overdue"), v.literal("task-complete"), v.literal("project-created")),
    actions: v.array(v.object({
      type: v.union(v.literal("send-email"), v.literal("move-stage"), v.literal("create-task"), v.literal("notify-admin")),
      config: v.any(),
    })),
    isActive: v.boolean(),
    lastTriggeredAt: v.optional(v.number()),
    createdAt: v.number(),
  }).index("by_workspace", ["workspaceId"]),

  activityLog: defineTable({
    workspaceId: v.id("workspaces"),
    userId: v.id("users"),
    entityType: v.union(v.literal("contact"), v.literal("invoice"), v.literal("project"), v.literal("task"), v.literal("automation")),
    entityId: v.string(),
    action: v.union(v.literal("created"), v.literal("updated"), v.literal("deleted")),
    changes: v.any(),
    timestamp: v.number(),
  }).index("by_workspace", ["workspaceId"])
    .index("by_timestamp", ["workspaceId", "timestamp"]),
});
