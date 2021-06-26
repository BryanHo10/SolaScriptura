import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Container, Message } from 'semantic-ui-react';
import classname from 'classnames';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BOOKS } from '../../../constants/books';
import './index.css';

const ChapterSelectionView = ({ bookId, count }) => {
	const history = useHistory();
	const selectVerse = (event, num) => {
		event.stopPropagation();
		history.push(`/bible/${bookId}/${num}`);
	};
	return (
		<Container fluid className="chapter-select">
			<Row>
				{[...Array(count)].map((num, index) => {
					const chapter_num = index + 1;
					return (
						<Col
							key={`chapter_${index}`}
							md={2}
							className="chapter-view"
							onClick={(e) => selectVerse(e, chapter_num)}
						>
							<div>{chapter_num}</div>
						</Col>
					);
				})}
			</Row>
		</Container>
	);
};

const SelectionView = ({ stacked, scrollable, hidden }) => {
	const [selectedBook, setSelectedBook] = useState(null);
	useEffect(() => {
		if (!hidden) setSelectedBook(null);
	}, [hidden]);
	return (
		<Container className={classname('py-2', { 'scroll-view': scrollable })}>
			<Row className={classname('', { 'stack-view': stacked })}>
				{BOOKS.map(({ name, meta }, index) => {
					const isSelected = selectedBook === name;
					return (
						<Col key={`book_${index}`} lg={stacked ? null : 3}>
							<Message
								className={classname('', { 'book-selectable': !isSelected })}
								onClick={() =>
									isSelected ? null : setSelectedBook((selectedBook) => name)
								}
							>
								<Message.Header className="py-2">{name}</Message.Header>
								{name === selectedBook && (
									<ChapterSelectionView
										bookId={name}
										count={meta.total_chapters}
									/>
								)}
							</Message>
						</Col>
					);
				})}
			</Row>
		</Container>
	);
};

SelectionView.propTypes = {
	stacked: PropTypes.bool,
	scrollable: PropTypes.bool,
};
export default SelectionView;
