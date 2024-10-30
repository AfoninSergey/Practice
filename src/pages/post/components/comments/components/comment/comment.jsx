import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
	CLOSE_MODAL,
	openModal,
	removeCommentAsync,
} from '../../../../../../actions';
import { useServerRequest } from '../../../../../../hooks';
import { Icon } from '../../../../../../components';
import { checkAccess } from '../../../../../../utils';
import { ROLE } from '../../../../../../constants';
import { selectUserRole } from '../../../../../../selectors';
import styled from 'styled-components';

const CommentContainer = ({
	className,
	id,
	author,
	postId,
	content,
	publishedAt,
}) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const userRole = useSelector(selectUserRole);

	const onCommentRemove = () => {
		document.body.classList.add('noScroll');
		dispatch(
			openModal({
				text: 'Удалить комментарий?',
				onConfirm: () => {
					dispatch(CLOSE_MODAL);
					document.body.classList.remove('noScroll');
					dispatch(removeCommentAsync(requestServer, id, postId));
				},
				onCancel: () => {
					document.body.classList.remove('noScroll');
					dispatch(CLOSE_MODAL);
				},
			}),
		);
	};
	const isAdminOrModerator = checkAccess([ROLE.ADMIN, ROLE.MODERATOR], userRole);

	return (
		<li className={className}>
			<div className="content">
				<div className="informationPanel">
					<div>
						<Icon id="user-circle-o" size="18px" margin="1px 0 0" />
						<span>
							<b>{author}</b>
						</span>
					</div>
					<div>
						<Icon id="calendar-o" size="17px" />
						<span>{publishedAt}</span>
					</div>
				</div>
				<div>{content}</div>
			</div>
			{isAdminOrModerator && (
				<button type="button" onClick={onCommentRemove}>
					<Icon id="trash-o" size="22px" />
				</button>
			)}
		</li>
	);
};

export const Comment = styled(CommentContainer)`
	display: flex;
	align-items: start;
	margin-top: 20px;

	& .content {
		width: 555px;
		border: 1px solid #000;
		border-radius: 3px;
		padding: 5px;
		word-wrap: break-word;
		& .informationPanel {
			display: flex;
			justify-content: space-between;
			margin-bottom: 10px;

			& div {
				display: flex;
				align-items: end;
				gap: 5px;

				& span {
					font-size: 13px;
					line-height: 100%;
				}

				& i {
					cursor: default;
				}
			}
		}
	}
`;

Comment.propTypes = {
	id: PropTypes.number.isRequired,
	author: PropTypes.string.isRequired,
	postId: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
};
