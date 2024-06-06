import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

export const connection = new Database('sqlite.db');


export const db = drizzle(connection);

migrate(db, {
    migrationsFolder: "app/db/migrations",
});