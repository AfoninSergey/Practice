import { ACTION_TYPE } from '../actions';

const initialAppState = {
	wasLogout: false,
	isLoading: true,
	modal: {
		isOpen: false,
		text: 'Вы уверены?',
		onConfirm: () => {},
		onCancel: () => {},
	},
};

export const appReduser = (state = initialAppState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.LOGOUT:
			return {
				...initialAppState,
				wasLogout: !state.wasLogout,
			};
		case ACTION_TYPE.OPEN_MODAL:
			return {
				...state,
				modal: {
					...state.modal,
					...payload,
					isOpen:true
				},

			}
		case ACTION_TYPE.CLOSE_MODAL:
			return {
				...state,
				modal: initialAppState.modal
			};
		case ACTION_TYPE.SET_LOADING:
			return {
				...state,
				isLoading: payload
			}
		default:
			return state;
	}
};
