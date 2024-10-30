import { Link } from 'react-router-dom';
import { Icon } from '../../../../components';
import { SpecialPanel } from '../special-panel/special-panel';
import { PROP_TYPE } from '../../../../constants';
import styled from 'styled-components';

const PostContentContainer = ({
	className,
	id,
	title,
	content,
	imageUrl,
	publishedAt,
}) => {
	return (
		<div className={className}>
			<img src={imageUrl} alt={title} />
			<h2>{title}</h2>
			<SpecialPanel
				publishedAt={publishedAt}
				postId={id}
				editButton={
					<Link className="editButton" to="edit">
						<Icon id="pencil-square-o" size="20px" />
					</Link>
				}
			/>
			<div className="postText">{content}</div>
		</div>
	);
};

export const PostContent = styled(PostContentContainer)`
	& img {
		float: left;
		margin-right: 20px;
		width: 280px;
		height: 150px;
	}

	& h2 {
		margin-bottom: 5px;
	}

	& .postText {
		text-align: justify;
		font-size: 17px;
		white-space: pre-line;
	}
`;

PostContent.propTypes = PROP_TYPE.POST
