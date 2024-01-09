import { db } from "../../src/lib/db";
async function main() {
  await db.completedChallenge.deleteMany({});
  console.log('All solved problems have been deleted');
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await db.$disconnect();
  });
