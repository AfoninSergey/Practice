import { URL } from '../constants';

export const setUserRole = (userId, roleId) =>
	fetch(`${URL.USERS}/${userId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'Application/json; Charset=UTF-8',
		},
		body: JSON.stringify({
			role_id: roleId,
		}),
	});
