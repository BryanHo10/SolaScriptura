import React from "react";
import { Container, Row, Button } from "react-bootstrap";
import "./index.css";

const NavigationView = ({
	prevTextLabel = "Previous",
	nextTextLabel = "Next",
	onPreviousClick,
	onNextClick,
	hidePrevious = false,
	hideNext = false,
}) => {
	return (
		<Container className="nav-container" fluid>
			<Row className="justify-content-around">
				{!hidePrevious && (
					<Button
						className="previous-btn"
						variant="outline-info"
						onClick={onPreviousClick}
					>
						{prevTextLabel}
					</Button>
				)}
				{!hideNext && (
					<Button
						className="next-btn"
						variant="outline-info"
						onClick={onNextClick}
					>
						{nextTextLabel}
					</Button>
				)}
			</Row>
		</Container>
	);
};
export default NavigationView;
