import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { isEmpty } from "lodash";
import SelectionView from "./Selection";
import ScriptureView from "./Scripture/ScriptureView";
import { Container, Row, Col } from "react-bootstrap";
import AutoScroll from "../HOC/AutoScrollTop";

const ReadingView = (props) => {
	const { bookId, chapterId } = useParams();
	if (!isEmpty(bookId) || !isEmpty(chapterId)) {
		return (
			<Container fluid>
				<Row>
					<Col md={3}>
						<SelectionView stacked scrollable />
					</Col>
					<Col className="scroll-view">
						<AutoScroll bookId={bookId} chapterId={chapterId}>
							<Link to="/" className="home-link">
								<FontAwesomeIcon icon={faHome} /> Home
							</Link>
							<ScriptureView bookId={bookId} chapterId={chapterId} />
						</AutoScroll>
					</Col>
				</Row>
			</Container>
		);
	}
	return (
		<div>
			<Link to="/" className="home-link">
				<FontAwesomeIcon icon={faHome} /> Home
			</Link>
			<SelectionView />
		</div>
	);
};
ReadingView.propTypes = {};
export default ReadingView;
