import prisma from '$lib/server/prisma';

export async function createSession(auth_id: string, user_id: string) {
	return await prisma.session.create({
		data: {
			auth_id,
			user_id
		}
	})
}

export async function getSession(id: string) {

	return await prisma.session.findUnique({
		where: { id }
	})
}

export async function removeSession(id: string) {
	return await prisma.session.delete({
		where: { id }
	})
}
//5da7d55a-2bb5-45bf-8854-22a65fe9c3db
