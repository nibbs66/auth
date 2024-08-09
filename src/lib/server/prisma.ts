import { PrismaClient} from '@prisma/client';




let prisma_check = import.meta.env.NODE_ENV;
const prisma = global.prisma || new PrismaClient()



if (prisma_check === 'development') {
	global.prisma = prisma

}

export default prisma;

export const disconnect = async () => {
	await prisma.$disconnect();
};
