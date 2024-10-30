import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useParams } from 'react-router-dom';
import { Comments, PostContent, PostForm } from './components';
import { useServerRequest } from '../../hooks';
import { loadPostAsync, RESET_POST_DATA, setIsLoading } from '../../actions';
import { selectIsLoading, selectPost, selectUserRole } from '../../selectors';
import { ErrorBlock, Spinner } from '../../components';
import { Error } from '../error/error';
import { checkAccess } from '../../utils';
import { ERROR, ROLE } from '../../constants';
import styled from 'styled-components';

const PostContainer = ({ className }) => {
	const [pageError, setPageError] = useState(null);
	const [accessError, setAccessError] = useState(null);
	const dispatch = useDispatch();
	const params = useParams();
	const isEditing = !!useMatch('/post/:id/edit');
	const isCreating = !!useMatch('/post');
	const requestServer = useServerRequest();
	const post = useSelector(selectPost);
	const isLoading = useSelector(selectIsLoading);
	const userRole = useSelector(selectUserRole);


	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			dispatch(setIsLoading(false));
			if (!checkAccess([ROLE.ADMIN], userRole)) {
				setAccessError(ERROR.ACCESS_DENIED);
			} else {
				setAccessError(null);
			}
			return;
		}

		if (isEditing) {
			if (!checkAccess([ROLE.ADMIN], userRole)) {
				setAccessError(ERROR.ACCESS_DENIED);
			} else {
				setAccessError(null);
			}
		}

		dispatch(setIsLoading(true));
		dispatch(loadPostAsync(requestServer, params.id)).then(({ error }) => {
			setPageError(error);
			dispatch(setIsLoading(false));
		});
	}, [dispatch, params.id, requestServer, isCreating, userRole, accessError, isEditing]);

	if (isLoading) return <Spinner />;
	if (pageError) return <Error />;

	return (
		<div className={className}>
			{isEditing || isCreating ? (
				(accessError && <ErrorBlock>{accessError}</ErrorBlock>) || (
					<PostForm {...post} />
				)
			) : (
				<>
					<PostContent {...post} />
					<Comments comments={post.comments} postId={post.id} />
				</>
			)}
		</div>
	);
};
export const Post = styled(PostContainer)`
	margin: 40px 0;
	padding: 0 50px;
`;
