import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserRow } from './components';
import { ERROR, ROLE } from '../../constants';
import { useServerRequest } from '../../hooks';
import { ErrorBlock, Spinner } from '../../components';
import { selectIsLoading, selectUserRole } from '../../selectors';
import styled from 'styled-components';
import { setIsLoading } from '../../actions';
import { checkAccess } from '../../utils';

const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [shouldUpdateUseEffect, setShouldUpdateUseEffect] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const isLoading = useSelector(selectIsLoading);
	const userRole = useSelector(selectUserRole);

	useEffect(() => {
		dispatch(setIsLoading(true));
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			setErrorMessage(ERROR.ACCESS_DENIED);
			dispatch(setIsLoading(false));
			return 
		}
		Promise.all([requestServer('fetchUsers'), requestServer('fetchRoles')]).then(
			([loadedUsers, loadedRoles]) => {
				if (loadedUsers.error || loadedRoles.error) {
					setErrorMessage(loadedUsers.error || loadedRoles.error);
					dispatch(setIsLoading(false));
				} else {
					setUsers(loadedUsers.res);
					setRoles(loadedRoles.res);
					dispatch(setIsLoading(false));
					setErrorMessage(false);
				}
			},
		);
	}, [requestServer, shouldUpdateUseEffect, dispatch, userRole]);

	const onUserRemove = (userId) => {
		dispatch(setIsLoading(true));
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			setErrorMessage(ERROR.ACCESS_DENIED);
			dispatch(setIsLoading(false));
		}
		requestServer('removeUser', userId).then(() => {
			setShouldUpdateUseEffect(!shouldUpdateUseEffect);
			dispatch(setIsLoading(false));
		});
	};

	return (
		<div className={className}>
			<h2>Пользователи</h2>

			{isLoading ? (
				<Spinner />
			) : errorMessage ? (
				<ErrorBlock>{errorMessage}</ErrorBlock>
			) : (
				<>
					<div className="usersHeaders">
						<div className="userLogin">Логин</div>
						<div className="userRegisteredAt">Дата регистрации</div>
						<div className="userRole">Роль</div>
					</div>
					{users.map(({ id, login, registeredAt, roleId }) => (
						<UserRow
							key={id}
							userId={id}
							login={login}
							registeredAt={registeredAt}
							userRoleId={roleId}
							roles={roles.filter((role) => role.id !== ROLE.GUEST)}
							onUserRemove={() => onUserRemove(id)}
						/>
					))}
				</>
			)}
		</div>
	);
};

export const Users = styled(UsersContainer)`
	width: 730px;
	margin: 0 auto;
	font-weight: 500;
	box-sizing: border-box;
	& h2 {
		text-align: center;
	}
	& .userLogin {
		width: 250px;
	}
	& .userRegisteredAt {
		width: 270px;
	}

	& .usersHeaders {
		display: flex;
		padding: 5px 10px;
	}
`;
