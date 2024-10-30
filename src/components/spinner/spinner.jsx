import styled, { keyframes } from 'styled-components';

const spinnerAnimation = keyframes`
    from {
        transform: translate(-50%, -40%) rotate(360deg);
    }
    to {
        transform: translate(-50%, -40%) rotate(0deg);
    }
`;

const SpinnerContainer = ({ className }) => (
	<div className={className}>
		<div className="spinner"></div>
	</div>
);
export const Spinner = styled(SpinnerContainer)`
	position: absolute;
	width: 100%;
	height: 100vh;
	top: 0;
	left: 0;
	& .spinner {
		width: 150px;
		height: 150px;
		position: absolute;
		top: 50%;
		left: 50%;
		background: conic-gradient(gray, transparent);
		border-radius: 50%;
		animation: ${spinnerAnimation} 1s linear infinite;
		&::before {
			content: '';
			position: absolute;
			width: 100px;
			height: 100px;
			background-color: #fff;
			border-radius: 50%;
			top: 25px;
			left: 25px;
		}

	}
`;
