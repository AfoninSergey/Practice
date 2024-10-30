import { setPostData } from "./set-post-data";


export const addCommentAsync =
	(requestServer, postId, userId, newComments) => (dispatch) => {
		requestServer('addPostComment', postId, userId, newComments)
		.then((postData) => {
			dispatch(setPostData(postData.res))
		})
	};
