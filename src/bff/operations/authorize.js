import { getUser } from '../api';
import { sessions } from '../sessions';

export const authorize = async (authLogin, authPassword) => {
	const user = await getUser(authLogin);

	if (!user) {
		console.log('Такой пользователь не найден');
		return {
			error: 'Такой пользователь не найден',
			res: null,
		};
	}

	const { id, login, roleId, password } = user;

	if (authPassword !== password) {
		console.log('Неверный пароль');
		return {
			error: 'Неверный пароль',
			res: null,
		};
	}

	const session = await sessions.create(user)

	return {
		error: null,
		res: {
			id,
			login,
			roleId,
			session,
		},
	};
};
