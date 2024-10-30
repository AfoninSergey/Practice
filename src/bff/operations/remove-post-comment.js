import { deleteComment } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';
import { getPostCommentsWithAuthor } from '../utils';

export const removePostComment = async (session, commentId, postId) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR];

	const access = await sessions.access(session, accessRoles);

	if (!access) {
		console.log('Нельзя удалять комментарии');
		return {
			error: true,
			res: null,
		};
	}

	await deleteComment(commentId);

	const comments = await getPostCommentsWithAuthor(postId);

	return {
		error: null,
		res: { comments },
	};
};
