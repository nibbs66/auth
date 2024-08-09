import jwt from "jsonwebtoken";
import {JWT_KEY_SECRET} from "$env/static/private";
export function create_jwt (session) {
	return jwt.sign({session_id: session.id,  user: session.user_id}, JWT_KEY_SECRET, {expiresIn: "1d"});
}
export const set_auth_token = ({cookies, token}) => {
	cookies.set('AuthorizationToken', `Bearer ${token}`, {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		maxAge: 60 * 60 * 24,
		path: '/'
	});
};
