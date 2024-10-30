import { deleteSession, addSession, getSession } from './api';

export const sessions = {
	async create(user) {
		const hash = Math.random().toFixed(50);

		const session = await addSession(hash, user);

		return session;
	},
	async remove(hash) {
		const session = await getSession(hash);

		if (!session) return;

		deleteSession(session.id);
	},
	async access(hash, accessRoles) {
		const session = await getSession(hash);
		
		return !!session && accessRoles.includes(session.user.roleId);
	},
};
