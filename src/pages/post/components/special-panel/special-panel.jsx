import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '../../../../components';
import { CLOSE_MODAL, openModal, removePostAsync } from '../../../../actions';
import { useServerRequest } from '../../../../hooks';
import { checkAccess } from '../../../../utils';
import { ROLE } from '../../../../constants';
import { selectUserRole } from '../../../../selectors';
import styled from 'styled-components';

const SpecialPanelContainer = ({ className, publishedAt, editButton, postId }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const requestServer = useServerRequest();
	const userRole = useSelector(selectUserRole);

	const onPostRemove = () => {
		document.body.classList.add('noScroll');
		dispatch(
			openModal({
				text: 'Удалить статью?',
				onConfirm: () => {
					dispatch(CLOSE_MODAL);
					document.body.classList.remove('noScroll');
					dispatch(removePostAsync(requestServer, postId)).then(() =>
						navigate('/'),
					);
				},
				onCancel: () => {
					document.body.classList.remove('noScroll');
					dispatch(CLOSE_MODAL);
				},
			}),
		);
	};

	const isAdmin = checkAccess([ROLE.ADMIN], userRole);

	return (
		<div className={className}>
			{publishedAt && (
				<Icon
					className="calendar"
					id="calendar-o"
					size="18px"
					margin="0 8px 1px  0"
				/>
			)}
			{publishedAt}
			{isAdmin && editButton}

			{publishedAt && isAdmin && (
				<Link onClick={onPostRemove}>
					<Icon id="trash-o" size="20px" margin="0 0 3px 10px" />
				</Link>
			)}
		</div>
	);
};

export const SpecialPanel = styled(SpecialPanelContainer)`
	display: flex;
	align-items: center;
	font-size: 18px;
	margin: 0 0 20px;

	& .calendar {
		cursor: default;
	}
	& .editButton {
		margin-left: auto;
	}
`;

SpecialPanel.propTypes = {
	postId: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	editButton: PropTypes.node.isRequired,
};
