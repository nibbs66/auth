
import prisma from "$lib/server/prisma"
export async function createNewNoncePair(data: string) {
	const nonce = crypto.randomUUID()
	return await prisma.noncePair.create({
		data: {
			data,
			nonce
		}
	})
}
export async function storeNewNoncePair(nonce: string, data: string) {
	return await prisma.noncePair.upsert({
		where: { data: data },
		update: {
			data,
			nonce,
			expiryAt: new Date(Date.now() + 60 * 1000)
		},
		create: {
			data,
			nonce,
			expiryAt: new Date(Date.now() + 60 * 1000)
		}
	})
}
export async function findNonceFromData(data: string) {
	const doc = await prisma.noncePair.findUniqueOrThrow({ where: { data } })

	await deleteNoncePair(doc.nonce)
	return doc
}
export async function deleteNoncePair(nonce: string) {
	return await prisma.noncePair.delete({ where: { nonce } })
}
