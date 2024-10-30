import { URL } from '../constants';
import { transformUser } from '../transformers';

export const getUsers = () =>
	fetch(URL.USERS).then((loadedUsers) => loadedUsers.json()).then((loadedUsers) => loadedUsers && loadedUsers.map(transformUser))
