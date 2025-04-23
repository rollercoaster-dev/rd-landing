import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

// Define badge schema using Zod
const BadgeSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  criteria: z.string(),
  issuer: z.string(),
  tags: z.array(z.string()),
  createdAt: z.string(),
});

// Create a type from the schema
type Badge = z.infer<typeof BadgeSchema>;

// Create a schema for creating a new badge (without id and createdAt)
const CreateBadgeSchema = BadgeSchema.omit({
  id: true,
  createdAt: true,
});

// Create and export the badges routes
export const badgesRoutes = new Hono();

// Get all badges
badgesRoutes.get("/", (c) => {
  // This would normally fetch from a database
  const badges: Badge[] = [
    {
      id: "1",
      name: "JavaScript Basics",
      description: "Completed the JavaScript Basics course",
      image: "https://example.com/badges/js-basics.png",
      criteria: "Complete all lessons in the JavaScript Basics course",
      issuer: "Rollercoaster.dev",
      tags: ["javascript", "web development", "programming"],
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "TypeScript Master",
      description: "Demonstrated advanced TypeScript skills",
      image: "https://example.com/badges/ts-master.png",
      criteria:
        "Complete the TypeScript advanced course and pass the final exam",
      issuer: "Rollercoaster.dev",
      tags: ["typescript", "web development", "programming"],
      createdAt: new Date().toISOString(),
    },
  ];

  return c.json(badges);
});

// Get a specific badge by ID
badgesRoutes.get("/:id", (c) => {
  const id = c.req.param("id");

  // This would normally fetch from a database
  const badge: Badge = {
    id,
    name: "JavaScript Basics",
    description: "Completed the JavaScript Basics course",
    image: "https://example.com/badges/js-basics.png",
    criteria: "Complete all lessons in the JavaScript Basics course",
    issuer: "Rollercoaster.dev",
    tags: ["javascript", "web development", "programming"],
    createdAt: new Date().toISOString(),
  };

  return c.json(badge);
});

// Create a new badge
badgesRoutes.post("/", zValidator("json", CreateBadgeSchema), (c) => {
  const body = c.req.valid("json");

  // This would normally save to a database
  const newBadge: Badge = {
    ...body,
    id: Math.random().toString(36).substring(2, 9),
    createdAt: new Date().toISOString(),
  };

  return c.json(newBadge, 201);
});
