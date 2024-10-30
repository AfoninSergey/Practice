import { URL } from '../constants';

export const getSession = (currentUserSessionHash) => 
	fetch(`${URL.SESSIONS}?session=${currentUserSessionHash}`)
		.then((response) => response.json())
		.then(([loadedSession]) => loadedSession);

