import { setPostData } from './set-post-data';

export const loadPostAsync = (requestServer, postId) => (dispatch) =>
	requestServer('fetchPost', postId).then((loadedData) => {
		if (loadedData.res) {
			dispatch(setPostData(loadedData.res));
		}
		return loadedData;
	});
