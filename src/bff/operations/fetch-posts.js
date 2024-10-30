import { getComments, getPosts } from '../api';
import { getCommentsCount } from '../utils';

export const fetchPosts = async (searchPhrase, page, limit) => {

	const [{posts, links}, comments] = await Promise.all([getPosts(searchPhrase, page, limit), getComments()]);

	return {
		error: null,
		res: {
			posts: posts.map(({ imageUrl, title, publishedAt, id }) => ({
				id,
				imageUrl,
				title,
				publishedAt,
				commentsCount: getCommentsCount(comments, id)
			})),
			links
		}
	};
};
