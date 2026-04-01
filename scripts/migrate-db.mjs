import { neon } from '@neondatabase/serverless';

const DATABASE_URL = "postgresql://neondb_owner:npg_Z6rq0vjxRdWY@ep-dry-hat-a48n9yoj-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require";
const sql = neon(DATABASE_URL);

async function migrate() {
    console.log("Starting migration...");
    try {
        console.log("Renaming columns in 'accounts' table...");
        await sql`ALTER TABLE accounts RENAME COLUMN user_id TO "userId";`;
        await sql`ALTER TABLE accounts RENAME COLUMN provider_account_id TO "providerAccountId";`;
        
        console.log("Renaming columns in 'sessions' table...");
        await sql`ALTER TABLE sessions RENAME COLUMN user_id TO "userId";`;
        
        console.log("Renaming columns in 'users' table...");
        await sql`ALTER TABLE users RENAME COLUMN email_verified TO "emailVerified";`;
        
        console.log("Migration SUCCESSFUL!");
    } catch (e) {
        console.error("Migration FAILED:", e.message);
        if (e.message.includes("does not exist")) {
            console.log("Note: Some columns might already be renamed or don't exist in your schema.");
        }
    }
}

migrate();
