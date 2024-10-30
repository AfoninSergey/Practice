import { ACTION_TYPE } from './action-type';

export const setIsLoading = (payload) => ({
	type: ACTION_TYPE.SET_LOADING,
	payload,
})
