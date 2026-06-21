import { mutation } from "./_generated/server";

export const main = mutation({
  args: {},
  handler: async (ctx) => {
    // Create workspace
    const workspaceId = await ctx.db.insert("workspaces", {
      name: "Demo Business",
      slug: "demo-business",
      plan: "business",
      createdAt: Date.now(),
      settings: { currency: "ZAR", timezone: "Africa/Johannesburg", vatRate: 0.15 },
    });

    // Create users
    const adminId = await ctx.db.insert("users", {
      email: "admin@demo.co.za",
      name: "Thabo Mokoena",
      role: "admin",
      workspaceId,
      lastActiveAt: Date.now(),
    });

    const memberId = await ctx.db.insert("users", {
      email: "member@demo.co.za",
      name: "Sarah Johnson",
      role: "member",
      workspaceId,
      lastActiveAt: Date.now(),
    });

    // Create contacts
    const contacts = [
      { name: "David Nkosi", email: "david@greenenergy.co.za", company: "GreenEnergy", status: "prospect" as const, stage: "qualified" as const, dealValue: 36400 },
      { name: "Lisa van der Berg", email: "lisa@freshfoods.co.za", company: "FreshFoods", status: "lead" as const, stage: "new" as const, dealValue: 0 },
      { name: "James Mthembu", email: "james@buildright.co.za", company: "BuildRight", status: "client" as const, stage: "won" as const, dealValue: 62000 },
      { name: "Naledi Dlamini", email: "naledi@digitalmarketing.co.za", company: "Digital Marketing SA", status: "prospect" as const, stage: "contacted" as const, dealValue: 24500 },
      { name: "Sipho Zulu", email: "sipho@logistics.co.za", company: "Zulu Logistics", status: "lead" as const, stage: "new" as const, dealValue: 0 },
    ];

    const contactIds = [];
    for (const c of contacts) {
      const id = await ctx.db.insert("contacts", {
        workspaceId,
        ...c,
        phone: "+27 82 000 0000",
        tags: [],
        notes: "",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      contactIds.push(id);
    }

    // Create projects
    const projectIds = [];
    for (let i = 0; i < 4; i++) {
      const id = await ctx.db.insert("projects", {
        workspaceId,
        contactId: contactIds[i],
        name: `Project ${i + 1}`,
        description: `Description for project ${i + 1}`,
        status: i === 0 ? "active" : i === 1 ? "planning" : "completed",
        budget: [48900, 36400, 12500, 62000][i],
        createdAt: Date.now(),
      });
      projectIds.push(id);
    }

    // Create tasks
    for (const projectId of projectIds) {
      for (let j = 0; j < 5; j++) {
        await ctx.db.insert("tasks", {
          projectId,
          title: `Task ${j + 1}`,
          assigneeId: j % 2 === 0 ? adminId : memberId,
          status: j < 2 ? "done" : j < 4 ? "in-progress" : "todo",
          priority: j === 0 ? "urgent" : j < 3 ? "high" : "medium",
          timeTracking: { estimated: 120, logged: j * 30 },
          createdAt: Date.now(),
        });
      }
    }

    return { workspaceId, userId: adminId };
  },
});
