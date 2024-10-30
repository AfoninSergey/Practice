import { getRoles } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const fetchRoles = async (userSession) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(userSession, accessRoles)

	if (!access) {
		return {
			error: 'Ошибка! Доступ запрещён!',
			res: null,
		};
	}

	const roles = await getRoles();

	return {
		error: null,
		res: roles,
	};
};
