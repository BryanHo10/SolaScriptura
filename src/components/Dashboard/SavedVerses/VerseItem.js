import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col } from "react-bootstrap";
import "./VerseItem.css";

const VerseItem = ({ onRemove, book, chapter, verseNum, verseText }) => {
	return (
		<Container fluid className="verse-container">
			<Row>
				<Col>
					<div>
						<h4 className="verse-label">
							{book} {chapter}:{verseNum}
						</h4>
						<hr />
						<p className="verse-text">{verseText}</p>
					</div>
				</Col>
				<Col sm={1}>
					<div className="text-center mt-3">
						<FontAwesomeIcon
							className="delete-icon"
							onClick={() =>
								onRemove(book, chapter, { num: verseNum, text: verseText })
							}
							icon={faTrashAlt}
						/>
					</div>
				</Col>
			</Row>
		</Container>
	);
};
export default VerseItem;
