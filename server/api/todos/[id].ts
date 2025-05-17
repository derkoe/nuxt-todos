import { and, eq } from "drizzle-orm";
import { db } from "../../db/index";
import { todo } from "../../db/schema";

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const userId = "9218fa52-3b0c-4316-a6ff-85ff52df2153"; // TODO: Replace with real auth

  if (method === "DELETE") {
    const id = event.context.params?.id;
    if (!id) throw createError({ statusCode: 400, statusMessage: "Missing todo id" });
    await db.delete(todo).where(and(eq(todo.id, id), eq(todo.owner, userId)));
    return { success: true };
  }

  if (method === "PUT") {
    const body = await readBody(event);
    if (!body.id) throw createError({ statusCode: 400, statusMessage: "Missing todo id" });
    await db
      .update(todo)
      .set({ done: body.completed })
      .where(and(eq(todo.id, body.id), eq(todo.owner, userId)));
    return { success: true };
  }
});
