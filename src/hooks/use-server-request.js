import { useSelector } from 'react-redux';
import { selectUserSession } from '../selectors';
import { server } from '../bff';
import { useCallback } from 'react';

export const useServerRequest = () => {
	const userSession = useSelector(selectUserSession);

	return useCallback((operation, ...params) => {
		const request = ['authorize', 'register', 'fetchPost', 'fetchPosts', 'fetchSession'].includes(operation) ? params : [userSession, ...params]

		return server[operation](...request)
	}, [userSession]);
};
