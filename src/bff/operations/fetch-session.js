import { getSession } from '../api';

export const fetchSession = async (currentUserSessionHashfromLocalStorege) => {
	const userSessionFromServer = await getSession(
		currentUserSessionHashfromLocalStorege,
	);

	if (!userSessionFromServer) return;

	const { session, user } = userSessionFromServer;
	console.log(userSessionFromServer);
	return {
		error: null,
		res: {
			id: user.id,
			login: user.login,
			roleId: user.roleId,
			session,
		},
	};
};
