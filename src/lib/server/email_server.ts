import nodemailer from "nodemailer";
import { EMAIL_PASS, EMAIL_ORIGIN } from '$env/static/private';

let transporter = nodemailer.createTransport({
	host: 'send.one.com',
	port: 587,
	secure: false,
	auth: {
		user: process.env['EMAIL_ORIGIN'],
		pass: process.env['EMAIL_PASS'],
	}
})
transporter.verify(function (error, success) {
	if (error) {
		console.error(error);
	} else {
		console.log("Server is ready to take our messages");
	}
});

export default transporter;
