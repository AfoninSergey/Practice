import { getPost } from '../api';
import { getPostCommentsWithAuthor } from '../utils';

export const fetchPost = async (postId) => {
	let post;
	try {
		post = await getPost(postId);
	} catch (error) {
		return {
			error,
			res: null,
		};
	}

	const comments = await getPostCommentsWithAuthor(postId);

	return {
		error: null,
		res: {
			...post,
			comments,
		},
	};
};
