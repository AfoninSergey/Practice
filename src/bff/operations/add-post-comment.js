import { addComment } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';
import { getPostCommentsWithAuthor } from '../utils';

export const addPostComment = async (userSession, postId, userId, newComment) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER];

	const access = await sessions.access(userSession, accessRoles);

	if (!access) {
		console.log('Нельзя оставлять комментарии');
		return {
			error: true,
			res: false,
		};
	}
	await addComment(postId, userId, newComment);
	const comments = await getPostCommentsWithAuthor(postId);

	return {
		error: null,
		res: { comments },
	};
};
