import { useEffect, useMemo, useState } from 'react';
import { useServerRequest } from '../../hooks';
import { Pagination, PostCard, Search } from './components';
import { PAGINATION_LIMIT } from '../../constants';
import styled from 'styled-components';
import { getLastPageFromLinks, debounce } from './utils';
import { ErrorBlock, Spinner } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoading } from '../../selectors';
import { setIsLoading } from '../../actions';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setlastpage] = useState(1);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);
	const requestServer = useServerRequest();
	const dispatch = useDispatch();
	const isLoading = useSelector(selectIsLoading);

	useEffect(() => {
		dispatch(setIsLoading(true));
		requestServer('fetchPosts', searchPhrase, page, PAGINATION_LIMIT).then(
			({ res: { posts, links } }) => {
				setPosts(posts);
				setlastpage(getLastPageFromLinks(links));
				dispatch(setIsLoading(false));
			},
		);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [requestServer, page, shouldSearch]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target: { value } }) => {
		setSearchPhrase(value);
		startDelayedSearch(!shouldSearch);
	};

	return (
		<div className={className}>
			<Search onChange={onSearch} searchPhrase={searchPhrase} />
			{isLoading ? (
				<Spinner />
			) : posts.length ? (
				<div className="postList">
					{posts.map(({ id, ...post }) => (
						<PostCard key={id} id={id} {...post} />
					))}
				</div>
			) : (
				<ErrorBlock>Статьи не найдены...</ErrorBlock>
			)}

			{lastPage > 1 && !isLoading && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
		</div>
	);
};

export const Main = styled(MainContainer)`
	padding: 50px;
	padding-top: 25px;
	& .postList {
		height: 470px;
		display: flex;
		flex-wrap: wrap;
		gap: 30px;
		margin-top: 15px;
	}
`;
