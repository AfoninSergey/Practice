export const getCommentsCount = (comments, postId) =>
	comments.filter(({ postId: commentPostId }) => commentPostId === postId).length;
