import { PrismaClient } from "@prisma/client";
import users from "./seeds/users";

const prisma = new PrismaClient();

async function main() {
    for (let user of users) {
        await prisma.user.create({
            data: user
        })
    }
}

main().catch(e => {
    console.log(e); 
    process.exit(1);
}).finally(() => prisma.$disconnect());