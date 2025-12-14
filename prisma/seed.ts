import { LANGUAGES, PrismaClient, ROLES } from '@prisma/client';
import * as bcrypt from 'bcrypt'
import { first } from 'rxjs';
var prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('suadmin@123', 10)
  await prisma.user.create({
    data:{
      email:'suadmin@amin.com',
      firstName:'Super',
      LastName:'Admin',
      userName: 'Super Admin',
      phone:'123456789',
      password:password, 
      role:'SUPER_ADMIN'
    }
  })

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });