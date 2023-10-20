import { PrismaClient } from "@prisma/client";
import users from "./seeds/users";

const prisma = new PrismaClient();

async function main() {
    for (const user of users) {
        const existingUser = await prisma.user.findFirst({
            where: {
                nickName: user.nickName,
            },
        });

        if (!existingUser) {
            // Se o usuário não existe, crie-o
            await prisma.user.create({
                data: user,
            });
    }
}
}

main().catch(e => {
    console.log(e); 
    process.exit(1);
}).finally(() => prisma.$disconnect());