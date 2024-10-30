import { URL } from '../constants';
import { transformPost } from '../transformers';
import { generateRandomDate } from '../utils';

export const addPost = ({ imageUrl, title, content }) =>
	fetch(URL.POSTS, {
		method: 'POST',
		headers: {
			'Content-Type': 'Application/json; Charset=UTF-8',
		},
		body: JSON.stringify({
			image_url: imageUrl,
			published_at: generateRandomDate(),
			title,
			content,
		}),
	})
		.then((response) => response.json())
		.then((loadedPost) => loadedPost && transformPost(loadedPost));
