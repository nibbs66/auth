import { getSession } from '$lib/server/db/session';
import { type Handle, redirect, type RequestEvent } from '@sveltejs/kit';
import { loginUser } from '$lib/server/user';
import jwt from 'jsonwebtoken';
import {JWT_KEY_SECRET} from "$env/static/private";
async function restoreFromSession(sessionId?: string) {

	if (!sessionId) return;

	const session = await getSession(sessionId);

	if (!session) {
		return;
	}

	return session.auth_id;
}

async function doLogin(event: RequestEvent) {
	let session = event.cookies.get('session');
	let token;
	let jwtUser;
	let session_cookie = event.cookies.get('AuthorizationToken')

	if (session_cookie) {
		token = session_cookie.split(' ')[1];

		jwtUser = jwt.verify(token, JWT_KEY_SECRET);
	} else {
		jwtUser = crypto.randomUUID();
	}
	const authId = await restoreFromSession(jwtUser.session_id);
	console.log(authId);
	if (!authId && !event.url.pathname.startsWith('/login')) {
		throw redirect(302, '/login');
	}

	if (authId) {
		try {
			event.locals.user = await loginUser(authId);
		} catch (e) {
			event.locals.user = undefined
			const session = crypto.randomUUID()
			event.cookies.set('session', session, { 'httpOnly': false, path: '/', secure: false })
		}
	}
}


export const handle = (async ({ event, resolve }) => {
	let token;
	let jwtUser;
	let session_cookie = event.cookies.get('AuthorizationToken')

	if (session_cookie) {
		token = session_cookie.split(' ')[1];

		 jwtUser = jwt.verify(token, JWT_KEY_SECRET);
	} else {
		jwtUser = crypto.randomUUID();
	}
	event.locals.session_user = jwtUser
	let session = event.cookies.get('session');

	if (!session) {
		// Assign empty session
		 session = crypto.randomUUID()
		event.cookies.set('session', session, { 'httpOnly': false, path: '/', secure: false })
	}

	if (!event.locals.user) {
		await doLogin(event)
	}

	if (event.locals.user &&  event.url.pathname === '/') {
		//throw redirect(302, '/new')
	}

	return await resolve(event);
}) satisfies Handle;


