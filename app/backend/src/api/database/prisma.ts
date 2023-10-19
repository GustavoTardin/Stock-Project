import { PrismaClient } from "@prisma/client";
import 'dotenv'


const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});

export default prisma;