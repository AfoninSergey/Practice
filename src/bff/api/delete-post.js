import { URL } from "../constants";

export const deletePost = (postid) => fetch(`${URL.POSTS}/${postid}`, {
	method: 'DELETE'
})