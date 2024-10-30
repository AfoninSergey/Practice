import PropTypes from 'prop-types';
import { styled } from 'styled-components';

const ButtonContainer = ({ className, children, width, ...props }) => (
	<button className={className} {...props}>
		{children}
	</button>
);

export const Button = styled(ButtonContainer)`
	width: ${({ width = '100%' }) => width};
	font-size: 18px;
	border: 1px solid #000;
	border-radius: 3px;
	height: 37px;
	cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`;

Button.propTypes = {
	children: PropTypes.node.isRequired,
	width: PropTypes.string, 
};
