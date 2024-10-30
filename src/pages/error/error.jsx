import { Icon } from '../../components/icon/icon';
import { ERROR } from '../../constants';
import styled, { keyframes } from 'styled-components';

const sway = keyframes`
    0% {
		transform: translateX(0px) skew(0deg);
    }

	25% {transform: translateX(-5px) skew(-5deg);}

    75% {
		transform: translateX(10px) skew(5deg);
    }
    100% {
        transform: translateX(0px) skew(0deg);
    }

`;

const ErrorContainer = ({ className }) => (
	<div className={className}>
		<div className="error">
			<Icon id="exclamation-triangle" />
			{ERROR.PAGE_NOT_FOUND}
		</div>
	</div>
);
export const Error = styled(ErrorContainer)`
	position: absolute;
	width: 100%;
	height: 100vh;
	top: 0;
	left: 0;
	font-size: 30px;
	& .error {
		position: absolute;
		top: 45%;
		width: 100%;
		text-align: center;
		animation: ${sway} 7s linear infinite;
	}
`;
