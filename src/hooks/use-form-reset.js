import { useEffect } from 'react';
import { useStore } from 'react-redux';

export const useFormReset = (reset) => {
	const store = useStore();
	useEffect(() => {
		let currentWasLogout = store.getState().app.wasLogout;

		return store.subscribe(() => {
			const previousWasLogout = currentWasLogout;
			currentWasLogout = store.getState().app.wasLogout;

			if (previousWasLogout !== currentWasLogout) {
				reset();
			}
		});
	}, [store, reset]);
};
