import { integer, text, boolean, pgTable, uuid } from "drizzle-orm/pg-core";

export const todo = pgTable("todo", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  text: text("text").notNull(),
  owner: uuid("owner").notNull(),
  done: boolean("done").default(false).notNull(),
});
