import prisma, { disconnect } from '$lib/server/prisma';
import { FIDO_EXPECTED_ORIGIN } from '$env/static/private'
import {DEFAULT_COLOUR} from '$lib/helpers';
import {robot_names} from '$lib/server/constants';
import { getUserFromAuthId, registerNewUser } from '$lib/server/db/users'
import { generateUsername } from '$lib/server/helpers'
import type { PageServerLoad, RequestEvent } from '../$types'
import { createSession } from '$lib/server/db/session'
export async function load({url, locals, cookies}) {
	let code;
	code = url.searchParams.get('code') || ''
	code = Number(code);

	try {
		const emailVerify = await prisma.emailVerify.findUnique({ where: { code } })
		if (!code) {
			return {
				user: {
					accentColour: DEFAULT_COLOUR
				},
				isNewUser: code === 'testNew'
			}
		}

		if (!emailVerify || emailVerify.expiryAt <= new Date()) {
			await prisma.emailVerify.delete({ where: { code } })
			return {
				message: 'This email link has expired - please try signing in again!'
			}
		}

		const { user_auth_id, credential_id, public_key, transports } = emailVerify
		await prisma.emailVerify.delete({ where: { code } })
		let tor;
		if (!!user_auth_id) {
			tor = await associateFidoWithUser( user_auth_id, credential_id, public_key, transports)
		}


		if (!!tor) {
			await loginUser(locals, cookies, tor.user.auth_id)
		}
		return tor
	} finally {
		await disconnect();
	}
}

export const actions = {
	default: async ({ request }) => {
		const data = Object.fromEntries(await request.formData());

		try {

		} finally {
			await disconnect();
		}
	}
};
async function associateFidoWithUser(user_auth_id: string, credentialId: string, publicKey: string, transports: string[]) {

	let user = await prisma.user.findUnique({
		where: { auth_id: user_auth_id }
	})

	let isNewUser = false

	if (!user) {
		// We need to register this user first
		const tempAvatar = await getRandomAvatar(user_auth_id)
		user = await registerNewUser(user_auth_id, generateUsername(15, 0), tempAvatar, DEFAULT_COLOUR)
		isNewUser = true
	}

	await prisma.u2F.create({
		data: {
			alias: FIDO_EXPECTED_ORIGIN,
			credential_id: credentialId,
			public_key: publicKey,
			user_id: user.id,
			transports
		}
	})

	return { user, isNewUser }
}
async function loginUser(locals: RequestEvent, cookies: RequestEvent,  auth_id: string) {
	locals.user = await getUserFromAuthId(auth_id)
	const session = await createSession(auth_id, locals.user.id)
	cookies.set('session', session.id, { 'httpOnly': false, path: '/', secure: false })
}
function select_name () {
	const randomIndex = Math.floor(Math.random() * robot_names.length);
	return robot_names[randomIndex].name
}
async function getRandomAvatar(authId: string) {
	let image = select_name()

	return `https://api.dicebear.com/9.x/bottts/svg?seed=${image}`
}

