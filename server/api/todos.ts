import { eq } from "drizzle-orm";
import { db } from "../db/index";
import { todo } from "../db/schema";

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const userId = "9218fa52-3b0c-4316-a6ff-85ff52df2153"; // TODO: Replace with real auth

  if (method === "GET") {
    const todos = await db.select().from(todo).where(eq(todo.owner, userId));
    return todos.map((t) => ({ id: t.id, text: t.text, completed: t.done }));
  }

  if (method === "POST") {
    const body = await readBody(event);
    if (!body.text) throw createError({ statusCode: 400, statusMessage: "Missing todo text" });
    const [created] = await db.insert(todo).values({ text: body.text, owner: userId }).returning();
    return { id: created.id, text: created.text, completed: created.done };
  }

  throw createError({ statusCode: 405, statusMessage: "Method Not Allowed" });
});
