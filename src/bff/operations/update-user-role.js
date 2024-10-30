import { setUserRole } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const updateUserRole = async (userSession, userId, roleId) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(userSession, accessRoles)

	if (!access) {
		console.log('Нельзя поменять роль')
		return {
			error: true,
			res: null,
		};
	}
	await setUserRole(userId, roleId);

	return {
		error: false,
		res: true,
	};
};
