import prisma, { disconnect } from '$lib/server/prisma';
import { removeSession } from '$lib/server/db/session';
import { fail, error, redirect,  } from '@sveltejs/kit';
export async function load({cookies}) {
	let id = cookies.get('session');
//Date.now() - 3600
	try {
		await removeSession(id)
 cookies.set('session', '', { 'expires': new Date(1), 'path': '/', secure: false })
		cookies.delete("AuthorizationToken", {
			path: '/'
		});
		throw redirect(307, '/login');
	} finally {
		await disconnect();
	}
}

