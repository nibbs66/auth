import prisma from "$lib/server/prisma"

export async function getUser(id: string) {
	return await prisma.user.findUnique({
		where: { id }
	})
}

export async function getUserFromAuthId(auth_id: string) {

	return await prisma.user.findUniqueOrThrow({
		where: { auth_id },

	})
}

export async function updateUser(id: string, first_name: string, avatar: string) {
	await prisma.user.update({
		where: { id },
		data: {
			first_name,
			avatar
		}
	})
}

export async function registerNewUser(auth_id: string, first_name: string, avatar: string, accent: string) {
	return await prisma.user.create({
		data: {
			auth_id,
			first_name,
			avatar,
			accentColour: accent
		}
	})
}
