import { ROLE, URL } from '../constants';
import { generateRandomDate } from '../utils';

export const addUser = (login, password) =>
	fetch(URL.USERS, {
		method: 'POST',
		headers: {
			'Content-Type': 'Application/json;Charset=UTF-8',
		},
		body: JSON.stringify({
			login,
			password,
			registered_at: generateRandomDate(),
			role_id: ROLE.READER,
		}),
	}).then((createdUser) => createdUser.json());
