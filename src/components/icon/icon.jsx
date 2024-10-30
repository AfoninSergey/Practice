import PropTypes from 'prop-types';
import styled from 'styled-components';

const IconContainer = ({ className, id }) => (
	<div className={className}>
		<i className={`fa fa-${id}`} aria-hidden="true"></i>
	</div>
);

export const Icon = styled(IconContainer)`
	font-size: ${({ size = '24px' }) => size};
	margin: ${({ margin = '0' }) => margin};
	cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
	color: ${({ disabled }) => (disabled ? '#b7b7b7' : '#000')};
`;

Icon.propTypes = {
	id: PropTypes.string.isRequired,
};
