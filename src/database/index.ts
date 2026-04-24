import { db } from './db';
import { usersTable } from './schema';


async function main() {
  try {
    await db.insert(usersTable).values({ name: 'John Doe', email:'john@gmail.com', username: 'jojo', password:'pass123' });
    const result = await db.select().from(usersTable);
    console.log('Successfully queried the database:', result);
  } catch (error) {
    console.error('Error querying the database:', error);
  }
}
main();