import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '../../../../components';

const PaginationContainer = ({ className, page, lastPage, setPage }) => {
	return (
		<div className={className}>
			<Button disabled={page === 1} onClick={() => setPage(1)}>
				В начало
			</Button>
			<Button disabled={page === 1} onClick={() => setPage(page - 1)}>
				Предыдущая
			</Button>
			<div className="currentPage">
				Страница: {page} из {lastPage}
			</div>
			<Button disabled={page === lastPage} onClick={() => setPage(page + 1)}>
				Следующая
			</Button>
			<Button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
				В конец
			</Button>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	margin-top: 30px;
	display: flex;
	align-items: center;
	gap: 10px;
	& .currentPage {
		width: 120%;
		height: 40px;
		border: 1px solid #000;
		border-radius: 5px;
		text-align: center;
		font-size: 19px;
		font-weight: 500;
		line-height: 36px;
		background-color: #dddddd;
	}
`;

Pagination.propTypes = {
	page: PropTypes.number.isRequired,
	lastPage: PropTypes.number.isRequired,
	setPage: PropTypes.func.isRequired,
};
