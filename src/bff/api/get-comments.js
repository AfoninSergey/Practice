import { URL } from '../constants';
import { transformComments } from '../transformers';

export const getComments = (postId) =>
	fetch(postId !== undefined ? `${URL.COMMENTS}?post_id=${postId}` : URL.COMMENTS)
		.then((response) => response.json())
		.then(
			(loadedComments) => loadedComments && transformComments(loadedComments),
		);
