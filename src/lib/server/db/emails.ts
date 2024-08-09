import prisma from '$lib/server/prisma';
import { render } from 'svelte/server';
import Mail from '/src/lib/components/emails/mail_template.svelte'
import transporter from '$lib/server/email_server';
import { FIDO_EXPECTED_ORIGIN } from '$env/static/private';
export async function generateSecurityCode(user_auth_id: string, credential_id: string, public_key: string, transports: string[], sender) {
	const code = Math.floor(10000 + Math.random() * 90000)
	const expires = new Date(Date.now() + 1000 * 60 * 60).toString()
	const { html, head } = render(Mail, { props: { origin: FIDO_EXPECTED_ORIGIN, code, expires } });
	await prisma.emailVerify.create({
		data: {
			code,
			user_auth_id,
			credential_id,
			public_key,
			transports,
			expiryAt: new Date(Date.now() + 60 * 60 * 1000)
		}
	})
	const options = {
		from: sender,
		to: 'chrismcnabb6691@gmail.com',
		subject: 'auth success',
		html: html
	};
	 await transporter.sendMail(options);
	 return code
}

