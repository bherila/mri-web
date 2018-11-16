import { navigate } from "gatsby"

export function getAuthToken(): string {
	const token = sessionStorage.getItem('sessionId') || '';
	if (token.length == 0) {
		loginRedirect();
	}
	return token;
}

export function loginRedirect() {
	sessionStorage.removeItem('sessionId');
	navigate('/admin');
}