import { updateUser } from "./db/users"
import prisma from "./prisma"

export async function loginUser(auth_id: string) {
	let dbUser = await prisma.user.findUnique({
		where: { auth_id },
		include: {auths: true}

	})

	if (!dbUser) {
		throw new Error('User not found')
	}

	return dbUser
}

export async function update(id: string, name: string, avatar: string) {
	return await updateUser(id, name, avatar)
}
