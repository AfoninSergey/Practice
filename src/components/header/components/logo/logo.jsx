import { styled } from 'styled-components';
import { Icon } from '../../../../components';
import { Link } from 'react-router-dom';

const LargeText = styled.div`
	font-size: 48px;
	line-height: 48px;
	font-weight: 600;
	margin-top: 16px;
`;
const SmallText = styled.div`
	font-size: 17px;
	line-height: 20px;
	font-weight: bold;
`;

const LogoContainer = ({ className }) => (

	<Link className={className} to="/">
		<Icon id="code" size="70px" margin="0 10px 0 0" />
		<div>
			<LargeText>Блог</LargeText>
			<SmallText>WEB-разработчика</SmallText>
		</div>
	</Link>
);

export const Logo = styled(LogoContainer)`
	margin-top: -21px;
	display: flex;
`;
