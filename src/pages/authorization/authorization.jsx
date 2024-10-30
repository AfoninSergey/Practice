import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { Button, ErrorBlock, Input } from '../../components';
import { useFormReset, useServerRequest } from '../../hooks';
import { setUser } from '../../actions';
import { selectUserLogin } from '../../selectors';
import styled from 'styled-components';

const authFormSchema = object({
	login: string()
		.required('Заполните Логин')
		.min(3, 'Неверно заполнен логин. Должно быть не меньше 3 символов')
		.max(15, 'Неверно заполнен логин. Должно быть не больше 15 символов')
		.matches(
			/^[\w .-]+$/,
			'Неверно заполнен логин. Допустимы буквы, цифры, нижнее подчеркивание, точка и дефис',
		),
	password: string()
		.required('Заполните Пароль')
		.min(3, 'Неверно заполнен пароль. Должно быть не меньше 6 символов')
		.max(30, 'Неверно заполнен пароль. Должно быть не больше 30 символов')
		.matches(
			/^[\w#%]/,
			'Неверно заполнен пароль. Допустимы буквы, цыфры, знак % и #',
		),
});

const AuthorizationContainer = ({ className }) => {
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});
	const requestServer = useServerRequest();
	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userLogin = useSelector(selectUserLogin);

	useFormReset(reset);

	const onFormSubmit = ({ login, password }) => {
		requestServer('authorize', login, password).then(({ error, res }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
			} else {
				dispatch(setUser(res));
				sessionStorage.setItem('currentUserData', JSON.stringify(res));
				navigate('/');
			}
		});
	};

	const formValidationError = errors.login?.message || errors.password?.message;
	const errorMessage = formValidationError || serverError;
	return (
		<div className={className}>
			<h2>Авторизация</h2>

			<form onSubmit={handleSubmit(onFormSubmit)}>
				{userLogin ? (
					<ErrorBlock>
						Вы авторизованы. Для выхода, нажмите на иконку "Выйти".
					</ErrorBlock>
				) : (
					<>
						<Input
							type="text"
							placeholder="Логин..."
							{...register('login', {
								onChange: () => setServerError(null),
							})}
						/>
						<Input
							type="password"
							placeholder="Пароль..."
							{...register('password', {
								onChange: () => setServerError(null),
							})}
						/>
						<Button
							width="190px"
							type="submit"
							disabled={!!formValidationError}
						>
							Авторизоваться
						</Button>
						{errorMessage && <ErrorBlock>{errorMessage}</ErrorBlock>}
						<Link to="/register">Регистрация</Link>
					</>
				)}
			</form>
		</div>
	);
};

export const Authorization = styled(AuthorizationContainer)`
	text-align: center;
	& > form {
		position: relative;
		margin: 0 auto;
		width: 260px;
		display: flex;
		flex-direction: column;
		align-items: center;

		& > a {
			display: block;
			font-size: 18px;
			margin-top: 10px;
			color: #0067c2;
			cursor: pointer;
			text-decoration: underline;
			&:hover {
			}
		}
	}
`;
