import { URL } from '../constants';
import { transformPost } from '../transformers';

export const getPosts = (searchPhrase, page, limit) =>
	fetch(`${URL.POSTS}?title_like=${searchPhrase}&_page=${page}&_limit=${limit}`)
		.then((response) =>
			Promise.all([response.json(), response.headers.get('Link')]),
		)
		.then(([loadedPosts, links]) => ({
			posts: loadedPosts && loadedPosts.map((post) => transformPost(post)),
			links,
		}));
