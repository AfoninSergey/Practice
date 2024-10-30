import PropTypes from 'prop-types';
import { Input, Icon } from '../../../../components';
import styled from 'styled-components';

const SearchContainer = ({ className, searchPhrase, onChange }) => (
	<div className={className}>
		<Input
			type="text"
			className="searchInput"
			value={searchPhrase}
			onChange={onChange}
			placeholder="Поиск по заголовкам..."
		/>
		<Icon className="searchIcon" disabled id="search" size="20px" />
	</div>
);

export const Search = styled(SearchContainer)`
	width: 340px;
	margin: 0 auto;
	display: flex;
	position: relative;
	& .searchInput {
		padding-right: 30px;
	}
	& .searchIcon {
		position: absolute;
		right: 5px;
		top: 5px;
	}
`;

Search.propTypes = {
	searchPhrase: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};
