import prisma, { disconnect } from '$lib/server/prisma';


export async function load({ locals }) {
	try {
		const find_nonce = await prisma.noncePair.findMany();
		const find_emails = await prisma.emailVerify.findMany();
		const session = await prisma.session.findMany();
		let avtr = ''
		if (!!locals.user) {
			avtr = locals.user.avatar
		}
		const sessions =  await prisma.session.findFirst({
			where: {
				user_id: locals.user.id
			}
		})
		const user = await prisma.user.findMany({
			include: {
				auths: true
			}
		});
		let expired;
		let d_email;

		if (find_nonce[0]?.expiryAt <= new Date()) {
			expired = await prisma.noncePair.delete({
				where: {
					id: find_nonce[0].id
				}
			});
		}
		if (find_emails[0]?.expiryAt <= new Date()) {
			d_email = await prisma.emailVerify.delete({
				where: {
					id: find_emails[0].id
				}
			});
		}

		return { find_nonce, find_emails, session, sessions, user, expired, d_email, avtr, locals };
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
