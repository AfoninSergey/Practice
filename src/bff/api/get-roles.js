import { URL } from '../constants';

export const getRoles = () =>
	fetch(URL.ROLES).then((loadedRoles) => loadedRoles.json());
