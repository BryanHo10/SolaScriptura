import React, { useState, useEffect } from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import { BOOKS } from "../../../constants/books";
import "./index.css";

const ChapterSelectionView = ({ count }) => {
	const selectVerse = (event, num) => {
		event.stopPropagation();
		console.log(num);
	};
	return (
		<Container fluid className="chapter-select">
			<Row>
				{[...Array(count)].map((num, index) => {
					const chapter_num = index + 1;
					return (
						<Col
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

const SelectionView = (props) => {
	const [selectedBook, setSelectedBook] = useState(null);
	return (
		<Container fluid>
			<Row>
				{BOOKS.map((book) => (
					<Col lg={3}>
						<Card
							className="clickable"
							onClick={() =>
								setSelectedBook((selectedBook) =>
									selectedBook === book.name ? null : book.name
								)
							}
						>
							<Card.Body>
								<Card.Title>{book.name}</Card.Title>
								{book.name == selectedBook && (
									<ChapterSelectionView count={book.meta.total_chapters} />
								)}
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
		</Container>
	);
};
SelectionView.propTypes = {};
export default SelectionView;
