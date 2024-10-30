import { URL } from '../constants';

export const deleteSession = async (sessoinId) =>
	fetch(`${URL.SESSIONS}/${sessoinId}`, {
		method: 'DELETE',
	});
