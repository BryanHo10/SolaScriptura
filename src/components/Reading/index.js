import React from "react";
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
							<Link to="/bible">Back to Selection</Link>
							<ScriptureView bookId={bookId} chapterId={chapterId} />
						</AutoScroll>
					</Col>
				</Row>
			</Container>
		);
	}
	return (
		<div>
			<Link to="/">Home</Link>
			<SelectionView />
		</div>
	);
};
ReadingView.propTypes = {};
export default ReadingView;
