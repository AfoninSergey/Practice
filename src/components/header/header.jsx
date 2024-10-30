import { Logo, ControlPanel } from './components';
import styled from 'styled-components';

const DiscriptionContainer = ({ className }) => (
	<div className={className}>
		Веб-технологии <br />
		Написание кода
		<br />
		Разбор ошибок
	</div>
);

const Discription = styled(DiscriptionContainer)`
	font-style: italic;
`;

const HeaderContainer = ({ className }) => (
	<header className={className}>
		<Logo />
		<Discription />
		<ControlPanel />
	</header>
);

export const Header = styled(HeaderContainer)`
	display: flex;
	justify-content: space-between;
	position: fixed;
	z-index: 10;
	top: 0;
	height: 90px;
	width: 1000px;
	padding: 7px 40px;
	background-color: #fff;
	box-shadow: 0px -2px 17px #000;
`;
