import { useSelector } from 'react-redux';
import { Button } from '../button/button';
import {
	selectModalIsOpen,
	selectModalOnCancel,
	selectModalOnConfirm,
	selectModalText,
} from '../../selectors';
import styled from 'styled-components';

const ModalContainer = ({ className }) => {
	const text = useSelector(selectModalText);
	const onConfirm = useSelector(selectModalOnConfirm);
	const onCancel = useSelector(selectModalOnCancel);
	const isOpen = useSelector(selectModalIsOpen);

	if (!isOpen) return null;

	return (
		<div className={className}>
			<div className="modal">
				<h3>{text}</h3>
				<div className="buttons">
					<Button onClick={onConfirm}>Да</Button>
					<Button onClick={onCancel}>Отмена</Button>
				</div>
			</div>
		</div>
	);
};

export const Modal = styled(ModalContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.7);
	z-index: 20;
	text-align: center;
	& .modal {
		min-height: 150px;
		width: 350px;
		background-color: #fff;
		padding: 15px;
		border: 3px solid #000000;
		border-radius: 5px;
		& h3 {
			min-height: 20px;
			box-sizing: content-box;
		}
		& .buttons {
			display: flex;

			gap: 15px;
			margin-top: 30px;
		}
	}
`;
