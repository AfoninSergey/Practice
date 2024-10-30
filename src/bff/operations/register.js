import { getUser, addUser } from '../api';
import { sessions } from '../sessions';

export const register = async (regLogin, regPassword) => {
	const existingUser = await getUser(regLogin);

	if (existingUser) {
		console.log(`Логин "${regLogin}" уже занят`);
		return {
			error: `Логин "${regLogin}" уже занят`,
			res: null,
		};
	}

	const registeredUser = await addUser(regLogin, regPassword);
	const session = await sessions.create(registeredUser)

	return {
		error: null,
		res: {
			id: registeredUser.id,
			login: registeredUser.login,
			roleId: registeredUser.role_id,
			session,
		},
	};
};
