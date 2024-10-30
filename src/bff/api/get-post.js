import { URL } from '../constants';
import { transformPost } from '../transformers';

export const getPost = (id) =>
	fetch(`${URL.POSTS}/${id}`)
		.then((response) =>
			response.ok ? response.json() : Promise.reject(true),
		)
		.then((loadedPost) => transformPost(loadedPost));
