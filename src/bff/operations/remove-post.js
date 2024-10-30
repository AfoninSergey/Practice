import { deleteComment, deletePost, getComments } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const removePost = async (userSession, postId) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(userSession, accessRoles);

	if (!access) {
		console.log('Нельзя удалить статью');
		return {
			error: true,
			res: null,
		};
	}

	await deletePost(postId);

	const comments = await getComments(postId);
	await Promise.all(comments.map(({ id }) => deleteComment(id)));

	return {
		error: null,
		res: true,
	};
};
