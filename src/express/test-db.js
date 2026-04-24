import { db } from '../database/db.js';
import { usersTable } from '../database/schema.js';
import { eq } from 'drizzle-orm';

async function test() {
    try {
        console.log("Testing DB connection...");
        const result = await db.select().from(usersTable).limit(1);
        console.log("DB connection successful! Result:", result);
    } catch (error) {
        console.error("DB Query Failed!");
        console.error("Error name:", error.name);
        console.error("Error message:", error.message);
        if (error.cause) {
            console.error("Cause name:", error.cause.name);
            console.error("Cause message:", error.cause.message);
            console.error("Cause code:", error.cause.code);
        }
    }
}

test();
