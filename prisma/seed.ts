import { LANGUAGES, PrismaClient, ROLES } from '@prisma/client';
import { release } from 'os';
var prisma = new PrismaClient();

async function main() {
  // Create Artists
 
  // Create Favorites



}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });