import type { ComponentProps } from 'svelte';
import { EMAIL_PASS, EMAIL_ORIGIN, FIDO_EXPECTED_ORIGIN } from '$env/static/private';
import { json, error, redirect } from '@sveltejs/kit';
//import { render  } from 'svelty-email';
import { mount } from 'svelte';
import { render } from 'svelte/server';
import Mail from '/src/lib/components/emails/mail_template.svelte'
import nodemailer from 'nodemailer';



//*YJptNsF.u5wW9F
//imap.one.com

export async function POST() {

	const transporter = nodemailer.createTransport({
		host: 'send.one.com',
		port: 587,
		secure: false,
		auth: {
			user: process.env['EMAIL_ORIGIN'],
			pass: process.env['EMAIL_PASS'],
		}

	})
	const code = Math.floor(10000 + Math.random() * 90000)
	const expires = new Date(Date.now() + 1000 * 60 * 60).toString()
	const { html, head } = render(Mail, { props: { origin: FIDO_EXPECTED_ORIGIN, code, expires } });
	const options = {
		from: '"chris mcnabb" <info@monkebyte.nl>',
		to: 'chrismcnabb6691@gmail.com',
		subject: 'hello world',
		html: html
	};
	const info = await transporter.sendMail(options);

	return json(info)
}
