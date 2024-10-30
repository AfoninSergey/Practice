import { URL } from '../constants';

export const addSession = (hash, user) =>
	fetch(URL.SESSIONS, {
		method: 'POST',
		headers: {
			'Content-Type': 'Application/json;Charset=UTF-8',
		},
		body: JSON.stringify({
			session: hash,
			user,
		}),
	}).then((response) => response.json()).then(({session}) => session)
