import React, { useState } from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import classname from "classnames";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { BOOKS } from "../../../constants/books";
import "./index.css";

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

const SelectionView = ({ stacked, scrollable }) => {
	const [selectedBook, setSelectedBook] = useState(null);
	return (
		<Container
			fluid
			className={classname("py-2", { "scroll-view": scrollable })}
		>
			<Row className={classname("", { "stack-view": stacked })}>
				{BOOKS.map((book, index) => {
					const isSelected = selectedBook === book.name;
					return (
						<Col key={`book_${index}`} lg={stacked ? null : 3}>
							<Card
								className={classname("", { "book-selectable": !isSelected })}
								onClick={() =>
									isSelected
										? null
										: setSelectedBook((selectedBook) => book.name)
								}
							>
								<Card.Body>
									<Card.Title>{book.name}</Card.Title>
									{book.name === selectedBook && (
										<ChapterSelectionView
											bookId={book.name}
											count={book.meta.total_chapters}
										/>
									)}
								</Card.Body>
							</Card>
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
