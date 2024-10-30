import { addPost, updatePost } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const savePost = async (userSession, newPostData) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(userSession, accessRoles);

	if (!access) {
		console.log('Нельзя редактировать!');
		return {
			error: true,
			res: false,
		};
	}

	const updatedOrCreatedPost = newPostData.postId
		? await updatePost(newPostData)
		: addPost(newPostData);

	return {
		error: null,
		res: updatedOrCreatedPost,
	};
};
