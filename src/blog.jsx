// npm run server
// npm start

import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Footer, Header, Modal } from './components';
import { Error, Authorization, Main, Post, Registration, Users } from './pages';
import styled from 'styled-components';
import { setUser } from './actions';

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1000px;
	height: 100%;
	background-color: #fff;
	margin: 0 auto;
`;

const Page = styled.main`
	position: relative;
	height: auto;
	background-color: #fff;
	padding: 90px 0;
`;

export const Blog = () => {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('currentUserData');
		if (currentUserDataJSON) {
			dispatch(setUser(JSON.parse(currentUserDataJSON)));
		}
	}, [dispatch]);

	return (
		<AppColumn>
			<Header />
			<Page>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/post/:id" element={<Post />} />
					<Route path="/post/:id/edit" element={<Post />} />
					<Route path="/post" element={<Post />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/users" element={<Users />} />
					<Route path="*" element={<Error />} />
				</Routes>
			</Page>
			<Footer />
			<Modal />
		</AppColumn>
	);
};
