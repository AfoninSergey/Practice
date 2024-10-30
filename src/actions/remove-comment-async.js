import { setPostData } from "./set-post-data";

export const removeCommentAsync =
	(requestServer, commentId, postId) => (dispatch) => {
		requestServer('removePostComment', commentId, postId).then(({res}) =>
			dispatch(setPostData(res))
		);
	};
