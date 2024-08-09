

import prisma, {disconnect} from '$lib/server/prisma';
import type { RequestEvent, RequestHandler } from './$types';
import { FIDO_EXPECTED_ORIGIN, FIDO_RPID } from '$env/static/private';
import { verifyAuthenticationResponse, verifyRegistrationResponse } from '@simplewebauthn/server';
import { json } from '@sveltejs/kit';
import { getUserFromAuthId } from '$lib/server/db/users';
import { createSession } from '$lib/server/db/session';
import {create_jwt} from '$lib/helper_functions/create_token'
import base64url from 'base64url'
import { isoUint8Array } from '@simplewebauthn/server/helpers'
import { findNonceFromData } from '$lib/server/nonce';
import {generateSecurityCode} from '$lib/server/db/emails'
export const POST: RequestHandler = async (event) => {
	const data = await event.request.json()

	const challenge = await findNonceFromData(data.username)

	if (data.intent === 'register') {
		return await fidoRegister(data, challenge.nonce)
	}
	const user = await prisma.user.findUnique({ where: { auth_id: data.username }, include: { auths: true } })
	const bodyCredIDBuffer = base64url.toBuffer(data.rawId);

	const auth = user?.auths.find(o => o.alias === FIDO_EXPECTED_ORIGIN && data.rawId === o.credential_id)
	if (!user || !auth) {
		return json({ success: false, message: 'User not found or not setup for FIDO on this device' }, { status: 404 })
	}


	try {
		await verifyAuthenticationResponse({
			response: data,
			expectedChallenge: challenge.nonce,
			expectedOrigin: FIDO_EXPECTED_ORIGIN,
			expectedRPID: FIDO_RPID,
			authenticator: {
				credentialID: auth.credential_id,
				credentialPublicKey: isoUint8Array.fromHex(auth.public_key)
			}
		})

		await loginUser(event, data.username)
		return json({ success: true }, { status: 200 })
	} catch (e) {
		console.log(e)
		return json({ success: false, message: 'Login rejected' }, { status: 500 })
	} finally {
		await disconnect()
	}

};

async function fidoRegister(data: any, challenge: string) {
		try {
			const reg = await verifyRegistrationResponse({
				response: data,
				expectedChallenge: challenge,
				expectedOrigin: FIDO_EXPECTED_ORIGIN,
				expectedRPID: FIDO_RPID
			})

			if (!reg.registrationInfo) {
				throw new Error(`FIDO verification failed`)
			}
			let address = 'info@monkebyte.nl'
			let sender = `"Auth" <${address}>`
			const { credentialID, credentialPublicKey } = reg.registrationInfo

			await generateSecurityCode(data.username, credentialID, isoUint8Array.toHex(credentialPublicKey), data.response.transports, sender)

			return json({ success: true, verified: reg },  { status: 201 })

		} catch (e: any) {
			console.log(e)
			return json({ success: false, message: e.message }, { status: 400 })

		}
}
async function loginUser(event: RequestEvent, authId: string) {
	event.locals.user = await getUserFromAuthId(authId)
	const session = await createSession(authId, event.locals.user.id)
	const token = await create_jwt(session)

	event.cookies.set('session', session.id, { 'httpOnly': false, path: '/', secure: false })
	event.cookies.set('AuthorizationToken', `Bearer ${token}`, {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		maxAge: 60 * 60 * 24,
		path: '/'
	});
}
