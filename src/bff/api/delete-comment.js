import { URL } from '../constants';

export const deleteComment = (id) => fetch(`${URL.COMMENTS}/${id}`, {
	method: 'DELETE'
});

