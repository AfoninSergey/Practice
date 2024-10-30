import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Button } from '../../../../components';
import { ROLE } from '../../../../constants';
import {
	selectUserLogin,
	selectUserRole,
	selectUserSession,
} from '../../../../selectors';
import { logout } from '../../../../actions';
import { checkAccess } from '../../../../utils';
import { styled } from 'styled-components';

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	font-size: 18px;
	font-weight: bold;
`;

export  const ControlPanel = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userRole = useSelector(selectUserRole);
	const userLogin = useSelector(selectUserLogin);
	const userSession = useSelector(selectUserSession);

	const onLogout = () => {
		sessionStorage.removeItem('currentUserData');
		dispatch(logout(userSession));
	};

	const isAdmin = checkAccess([ROLE.ADMIN], userRole);

	return (
		<div>
			<RightAligned>
				{userRole === ROLE.GUEST ? (
					<Link to="/login">
						<Button width="100px" type="button">
							Войти
						</Button>
					</Link>
				) : (
					<>
						{userLogin}
						<Link onClick={onLogout}>
							<Icon id="sign-out" size="30px" margin="0 0 0 16px" />
						</Link>
					</>
				)}
			</RightAligned>
			<RightAligned>
				<Link onClick={() => navigate(-1)}>
					<Icon id="backward" margin="7px 0 0 0" />
				</Link>
				{isAdmin && (
					<>
						{' '}
						<Link to="/post">
							<Icon id="file-text-o" margin="7px 0 0 16px" />
						</Link>
						<Link to="/users">
							<Icon id="users" margin="7px 0 0 16px" />
						</Link>
					</>
				)}
			</RightAligned>
		</div>
	);
};

