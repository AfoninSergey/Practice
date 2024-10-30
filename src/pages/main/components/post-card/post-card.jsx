import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon } from '../../../../components';
import styled from 'styled-components';

const PostCardContainer = ({
	className,
	id,
	title,
	imageUrl,
	publishedAt,
	commentsCount,
}) => (
	<div className={className}>
		<Link to={`post/${id}`} title={title}>
			<img src={imageUrl} alt={title} />
			<div className="postCardFooter">
				<h4>{title}</h4>
				<div className="postCardInfo">
					<Icon id="calendar-o" size="18px" margin="0 6px 2px  0" />
					{publishedAt}
					<Icon
						className="commentCount"
						id="comment-o"
						size="18px"
						margin="0 4px 2px  0"
					/>
					{commentsCount}
				</div>
			</div>
		</Link>
	</div>
);

export const PostCard = styled(PostCardContainer)`
	width: 280px;
	height: 220px;
	border: 1px solid #000;
	transition: 0.1s;
	&:hover {
		box-shadow: 0 0 5px 0 #4e4e4e;
	}
	& img {
		width: 100%;
		height: 150px;
		border-bottom: 1px solid #000;
		/* object-fit: cover; */
	}

	& .postCardFooter {
		padding: 7px;
	}
	& h4 {
		margin: 0;
		font-size: 15px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	& .postCardInfo {
		display: flex;
		align-items: center;
		margin-top: 5px;
		& .commentCount {
			margin-left: auto;
		}
	}
`;

PostCard.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	imageUrl: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	commentsCount: PropTypes.number.isRequired,
}
