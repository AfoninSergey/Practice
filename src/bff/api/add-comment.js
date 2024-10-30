import { URL } from '../constants';
import { generateRandomDate } from '../utils';

export const addComment = (postId, userId, content) =>
	fetch(URL.COMMENTS, {
		method: 'POST',
		headers: {
			'Content-Type': 'Application/json; Charset=UTF-8',
		},
		body: JSON.stringify({
			author_id: userId,
			post_id: postId,
			published_at: generateRandomDate(),
			content,
		}),
	});
