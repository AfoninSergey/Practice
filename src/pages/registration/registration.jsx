import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string, ref } from 'yup';
import { Button, ErrorBlock, Input } from '../../components';
import { useFormReset, useServerRequest } from '../../hooks';
import { setUser } from '../../actions';
import styled from 'styled-components';

const regFormSchema = object({
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
	confirmPassword: string().oneOf([ref('password'), null], 'Пароли не совпадают'),
});

const RegistrationContainer = ({ className }) => {
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			confirmPassword: '',
		},
		resolver: yupResolver(regFormSchema),
	});
	const requestServer = useServerRequest();
	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();

	const navigate = useNavigate();

	useFormReset(reset);

	const onFormSubmit = ({ login, password }) => {
		requestServer('register', login, password).then(({ error, res }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
			} else {
				dispatch(setUser(res));
				sessionStorage.setItem('currentUserData', JSON.stringify(res));
				navigate('/');
			}
		});
	};

	const formValidationError =
		errors.login?.message ||
		errors.password?.message ||
		errors.confirmPassword?.message;
	const errorMessage = formValidationError || serverError;
	return (
		<div className={className}>
			<h2>Регистрация</h2>

			<form onSubmit={handleSubmit(onFormSubmit)}>
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
				<Input
					type="password"
					placeholder="Повтор пароля..."
					{...register('confirmPassword', {
						onChange: () => setServerError(null),
					})}
				/>
				<Button width="210px" type="submit" disabled={!!formValidationError}>
					Зарегестрироваться
				</Button>
				{errorMessage && <ErrorBlock>{errorMessage}</ErrorBlock>}
			</form>
		</div>
	);
};

export const Registration = styled(RegistrationContainer)`
	text-align: center;
	& > form {
		position: relative;
		margin: 0 auto;
		/* min-height: 150px; */
		width: 260px;
		display: flex;
		flex-direction: column;
		align-items: center;

		& > a {
			display: block;
			font-size: 18px;
			margin-top: 15px;
			color: #0067c2;
			cursor: pointer;
			text-decoration: underline;
		}
	}
`;
