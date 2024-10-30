import { useLayoutEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useServerRequest } from '../../../../hooks';
import { Icon, Input } from '../../../../components';
import { sanitizeContent } from './utils';
import { savePostAsync } from '../../../../actions';
import { SpecialPanel } from '../special-panel/special-panel';
import { PROP_TYPE } from '../../../../constants';
import styled from 'styled-components';

const PostFormContainer = ({
	className,
	id,
	title,
	content,
	imageUrl,
	publishedAt,
}) => {
	const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
	const [titleValue, setTitleValue] = useState(title);
	const contentRef = useRef(null);
	const requestServer = useServerRequest();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useLayoutEffect(() => {
		setImageUrlValue(imageUrl);
		setTitleValue(title);
	}, [imageUrl, title]);

	const onSave = () => {
		const newContent = sanitizeContent(contentRef.current.innerHTML);
		dispatch(
			savePostAsync(requestServer, {
				imageUrl: imageUrlValue,
				title: titleValue,
				content: newContent,
				postId: id,
			}),
		).then(({ id }) => navigate(`/post/${id}`));
	};

	const onImageUrlChange = ({ target: { value } }) => setImageUrlValue(value);

	const onTitleChange = ({ target: { value } }) => setTitleValue(value);

	return (
		<div className={className}>
			<Input
				type="text"
				value={imageUrlValue}
				placeholder="Изображение..."
				onChange={onImageUrlChange}
			/>
			<Input
				type="text"
				value={titleValue}
				placeholder="Заголовок..."
				onChange={onTitleChange}
			/>
			<SpecialPanel
				publishedAt={publishedAt}
				postId={id}
				editButton={
					<Link className="editButton" onClick={onSave}>
						<Icon id="floppy-o" size="20px" margin="0 0 1px 0" />
					</Link>
				}
			/>
			<div
				ref={contentRef}
				className="postText"
				contentEditable
				suppressContentEditableWarning
			>
				{content}
			</div>
		</div>
	);
};

export const PostForm = styled(PostFormContainer)`
	& .postText {
		position: relative;
		text-align: justify;
		font-size: 18px;
		white-space: pre-line;
		border: 1px solid #000;
		border-radius: 3px;
		min-height: 200px;
		padding: 10px;
	}
	& .postText::before {
		content: 'Текст статьи...';
		position: absolute;
		color: #aaaaaa;
		font-size: 19px;
		font-weight: 400;
	}

	& .postText:not(:empty):before {
		opacity: 0;
	}
`;

PostForm.propTypes = PROP_TYPE.POST
