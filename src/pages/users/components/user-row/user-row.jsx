import PropTypes from 'prop-types';
import { useState } from 'react';
import { Icon } from '../../../../components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useServerRequest } from '../../../../hooks';
import { PROP_TYPE } from '../../../../constants';

const UserRowContainer = ({
	className,
	userId,
	login,
	registeredAt,
	userRoleId,
	roles,
	onUserRemove,
}) => {
	const [initialRoleId, setInitialRoleId] = useState(userRoleId);
	const [selectedRole, setSelectedRole] = useState(userRoleId);
	const [error, setError] = useState(false);
	const requestServer = useServerRequest();

	const onRoleChange = ({ target: { value } }) => {
		setSelectedRole(+value);
	};

	const isDisabled = initialRoleId === selectedRole;

	const onRoleSave = () => {
		requestServer('updateUserRole', userId, selectedRole).then((response) => {
			if (response.error) {
				setError(true);
				setSelectedRole(initialRoleId);
			} else {
				setInitialRoleId(selectedRole);
			}
		});
	};

	return (
		<div className={className}>
			<div className="userData">
				<div className="userLogin">{login}</div>
				<div className="userRegisteredAt">{registeredAt}</div>
				<select
					className="userRole"
					value={selectedRole}
					onChange={onRoleChange}
				>
					{roles.map(({ id: roleId, name: roleName }) => (
						<option key={roleId} value={roleId}>
							{roleName}
						</option>
					))}
				</select>
				{error ? (
					<Icon id="ban" disabled={isDisabled} margin="0 0 4px 10px" />
				) : (
					<Link
						disabled={isDisabled}
						onClick={() => {
							if (!isDisabled) onRoleSave();
						}}
					>
						<Icon
							id="floppy-o"
							disabled={isDisabled}
							margin="0 0 4px 10px"
						/>
					</Link>
				)}
			</div>
			<Link onClick={onUserRemove}>
				<Icon id="trash-o" margin="0 0 0 10px" />
			</Link>
		</div>
	);
};

export const UserRow = styled(UserRowContainer)`
	display: flex;
	align-items: center;
	justify-content: center;
	& .userData {
		border: 2px solid black;
		border-radius: 3px;
		display: flex;
		width: 700px;
		height: 40px;
		align-items: center;
		padding: 5px 10px;
		margin-top: 5px;
		& select {
			height: 27px;
			border: 2px solid black;
			border-radius: 3px;
		}
	}
`;

UserRow.propTypes = {
	login: PropTypes.string.isRequired,
	userId: PropTypes.string.isRequired,
	userRoleId: PROP_TYPE.ROLE_ID.isRequired,
	roles: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
	registeredAt: PropTypes.string.isRequired,
	onUserRemove: PropTypes.func.isRequired,
};
