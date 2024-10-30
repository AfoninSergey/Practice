import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import styled from 'styled-components';

const InputContainer = forwardRef(({ className, width, ...props }, ref) => (
	<input className={className} {...props} ref={ref} />
));

export const Input = styled(InputContainer)`
	width: ${({ width = '100%' }) => width};
	height: 40px;
	padding: 10px;
	margin-bottom: 12px;
	border: 1px solid #000;
	border-radius: 3px;
	font-size: 18px;
	&::placeholder {
		color: #aaa8a8;
	}
`;

Input.propTypes = {
	width: PropTypes.string,
};
