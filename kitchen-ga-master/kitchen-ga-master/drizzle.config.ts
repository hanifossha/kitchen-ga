import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
    schema: './app/db/schema.ts',
    out: './drizzle',
    driver: 'better-sqlite',
    dbCredentials: {
        url: './database.db'
    },
} satisfies Config;