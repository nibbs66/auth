import fetch from "node-fetch"

export async function getRandomAvatar(authId: string) {
	return `https://robohash.org/${authId}?set=set3`
}

export async function getImageAsBase64(thumbnailUri: string) {
	const thumbnailRes = await fetch(thumbnailUri)
	return (await thumbnailRes.buffer()).toString('base64')
}

