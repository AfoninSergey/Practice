import { getComments, getUsers } from '../api';

export const getPostCommentsWithAuthor = async (postId) => {

	const [comments, users] = await Promise.all([getComments(postId), getUsers()]);

	return comments.map((comment) => {
		const user = users.find(({id}) => id === comment.authorId)
		return {
			...comment,
			author: user?.login
		}
	})
};