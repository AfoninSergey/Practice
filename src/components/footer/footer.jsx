import { useEffect, useState } from 'react';
import { URL } from '../../bff/constants';
import styled from 'styled-components';

const FooterContainer = ({ className }) => {
	const [weatner, setWeatner] = useState('погода');
	const [city, setCity] = useState('Москва');
	const [temperature, setTemperature] = useState('00');
	const [date, setDate] = useState('00-00-00');

	useEffect(() => {
		setDate(new Date().toLocaleDateString());
		fetch(URL.WEATHER)
			.then((response) => response.json())
			.then(({ weather, name, main }) => {
				setWeatner(weather[0].description);
				setCity(name);
				setTemperature(Math.round(main.temp));
			})
			.catch(() => {
				console.log('Погода не грузится');
			});
	}, []);

	return (
		<footer className={className}>
			<div>
				<div>Блог WEB-разработчика</div>
				<a href="mailto:web@developer.ru">web@developer.ru</a>
			</div>
			<div>
				<div>
					г.{city}, {date}г.
				</div>
				<div>
					Температура {temperature}°C, {weatner}
				</div>
			</div>
		</footer>
	);
};
export const Footer = styled(FooterContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	bottom: 0;
	height: 90px;
	width: 1000px;
	padding: 20px 40px;
	background-color: #fff;
	box-shadow: 0px 2px 17px #000;
	font-size: 17px;
	line-height: 25px;
	font-weight: bold;
`;
