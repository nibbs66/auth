import prisma, { disconnect } from '$lib/server/prisma';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { generateRegistrationOptions, generateAuthenticationOptions } from '@simplewebauthn/server';
import { isoUint8Array } from '@simplewebauthn/server/helpers'
import {  FIDO_EXPECTED_ORIGIN, FIDO_RPID, } from '$env/static/private';
import { createNewNoncePair, storeNewNoncePair } from '$lib/server/nonce';
import type { U2F, User } from '@prisma/client';
import {message,  superValidate } from "sveltekit-superforms";
import { formSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
export const load: PageServerLoad = async ({cookies, locals}) => {

	return {
		locals,
		user: locals.user,
		background: 'bg-pink-200',
		session: cookies.get('session'),
		form: await superValidate(zod(formSchema)),
	}
}

export const actions = {
	fido: async (event) => {
		const form = await superValidate(event, zod(formSchema));
		if (!form.valid) {
			return fail(400, {
				form,
			});
		}
		const email = form.data?.email

		if (!email || !validateEmail(email)) {
			return fail(400, { message: 'Please enter a valid email address' })
		}

		const user = await prisma.user.findUnique({
			where: { auth_id: email },
			include: {
				auths: true
			}
		})

		const auths = user?.auths.filter(o => o.alias === FIDO_EXPECTED_ORIGIN) || []
		let authenticated;
		if (!user || !auths.length) {

			authenticated = await fidoRegister(user, email)

			return message(form,  authenticated);
		} else if (!!user || !!auths.length) {

			authenticated = await fidoAuthenticate(user, email)
		}


		return message(form,  authenticated);



	}
}satisfies Actions;

function validateEmail(email: string) {
	return email.toUpperCase().match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/)
}

async function fidoRegister(user: (User & { auths: U2F[] }) | null, email: string) {
	const opts = await generateRegistrationOptions({
		rpName: 'loginTest',
		rpID: FIDO_RPID,
		userID: isoUint8Array.fromUTF8String(email),
		userName: email,
		userDisplayName: email,
		attestationType: 'none',
		excludeCredentials: user?.auths.map(o => {
			return {
				id: isoUint8Array.fromHex(o.credentialId),
				transports: o.transports,
				type: 'public-key'
			}
		}) || [],

	})

	const challenge = opts.challenge

	const check = await storeNewNoncePair(challenge, email)


	return {
		url: `${FIDO_EXPECTED_ORIGIN}/login/fido`,
		intent: 'register',
		opts
	}
}

async function fidoAuthenticate(user: (User & { auths: U2F[] }) | null, email: string) {

	if (!user || !user.auths.length) {
		return fail(404, { message: 'user not found or has no FIDO registration' })
	}

	const opts = await generateAuthenticationOptions({
		rpName: 'loginTest',
		rpID: FIDO_RPID,
		allowCredentials: user?.auths.map(authenticator =>( {
			id: authenticator.credential_id,
			transports: authenticator.transports,
			type: 'public-key',
		})),
		userVerification: 'preferred',
	})

	const challenge =  opts.challenge

	await storeNewNoncePair(challenge, email)

	return {
		challenge: challenge,
		url: `${FIDO_EXPECTED_ORIGIN}/login/fido`,
		intent: 'login',
		opts
	}


}
