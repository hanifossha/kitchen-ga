import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const personels = sqliteTable('users', {
    id: text('id'),
    name: text('name').notNull().default(''),
    active: integer('int_modifiers', { mode: 'boolean' }).notNull().default(false),
});

export const shiftEntries = sqliteTable('shift_entries', {
    id: text('id'),
    personelId: text('personel_id').notNull(),
    task: text('task').notNull().default(''),
    job: text('job').notNull().default(''),
    preferredShifts: text('preferred_shifts').notNull().default(''),
});

export const tasks = sqliteTable('tasks', {
    id: text('id'),
    name: text('name').notNull().default(''),
    description: text('description').notNull().default(''),
});