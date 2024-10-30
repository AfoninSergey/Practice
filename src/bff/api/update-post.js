import { URL } from '../constants';
import { transformPost } from '../transformers';

export const updatePost = ( {postId, imageUrl, title, content }) =>
	fetch(`${URL.POSTS}/${postId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'Application/json; Charset=UTF-8',
		},
		body: JSON.stringify({
			image_url: imageUrl,
			title,
			content,
		}),
	})
		.then((response) => response.json())
		.then((loadedPost) => loadedPost && transformPost(loadedPost));
