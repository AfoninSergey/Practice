export const transformComments = (dbComments) =>
	dbComments.map((comment) => ({
		authorId: comment.author_id,
		postId: comment.post_id,
		publishedAt: comment.published_at,
		content: comment.content,
		id: comment.id,
	}));
