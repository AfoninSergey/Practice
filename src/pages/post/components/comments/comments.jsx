import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '../../../../components';
import { Comment } from './components';
import { useServerRequest } from '../../../../hooks';
import { selectUserId, selectUserRole } from '../../../../selectors';
import { addCommentAsync } from '../../../../actions';
import { PROP_TYPE, ROLE } from '../../../../constants';
import styled from 'styled-components';

const CommentsContainer = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = useState('');
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const userId = useSelector(selectUserId);
	const userRole = useSelector(selectUserRole);

	const onNewCommentAdd = (event) => {
		event.preventDefault();

		if (newComment.trim().length === 0) return;

		dispatch(addCommentAsync(requestServer, postId, userId, newComment));

		setNewComment('');
	};

	const isGuest = userRole === ROLE.GUEST;

	return (
		<div className={className}>
			{!isGuest && (
				<form className="newCommentForm" onSubmit={onNewCommentAdd}>
					<textarea
						value={newComment}
						name="newComment"
						onChange={({ target: { value } }) => setNewComment(value)}
						placeholder="Комментарий..."
					/>
					<button type="submit">
						<Icon id="paper-plane-o" size="18px" />
					</button>
				</form>
			)}
			<ul className="comments">
				{comments.map(({ id, author, publishedAt, content }) => (
					<Comment
						key={id}
						id={id}
						author={author}
						publishedAt={publishedAt}
						content={content}
						postId={postId}
					/>
				))}
			</ul>
		</div>
	);
};

export const Comments = styled(CommentsContainer)`
	width: 580px;
	margin: 20px auto;

	& .newCommentForm {
		display: flex;
		align-items: start;
		& textarea {
			width: 555px;
			height: 100px;
			resize: none;
			padding: 10px;
			outline: none;
			font-size: 16px;
			border: 1px solid #000;
			border-radius: 3px;
		}
	}
	& button {
		padding: 0;
		margin-left: 5px;
		margin-top: 5px;
		background-color: transparent;
		border: none;
		&:hover {
			text-shadow: 0px 0px 17px #999;
		}

		&:active {
			text-shadow: 0px 0px 7px #999;
		}
	}
	& .comments {
		list-style: none;
		padding: 0;
		margin: 0;
		margin-top: 20px;
	}
`;

Comments.propTypes = {
	comments: PropTypes.arrayOf(PROP_TYPE.COMMENT).isRequired,
	postId: PropTypes.string.isRequired,
};
