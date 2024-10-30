import { URL } from '../constants';
import { transformUser } from '../transformers';

export const getUser = (loginToFind) =>
	fetch(`${URL.USERS}?login=${loginToFind}`)
		.then((loadedUserData) => loadedUserData.json())
		.then(([loadedUser]) => loadedUser && transformUser(loadedUser));
