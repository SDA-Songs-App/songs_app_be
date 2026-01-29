"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
var prisma = new client_1.PrismaClient();
async function main() {
    const password = await bcrypt.hash('suadmin@123', 10);
    await prisma.user.create({
        data: {
            email: 'suadmin@amin.com',
            firstName: 'Super',
            LastName: 'Admin',
            userName: 'Super Admin',
            phone: '123456789',
            password: password,
            role: 'SUPER_ADMIN'
        }
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map