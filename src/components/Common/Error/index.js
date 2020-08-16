import React from "react";
import { Container, Alert } from "react-bootstrap";
import { isEmpty } from "lodash";
import "./index.css";

const ErrorView = ({ message }) => {
	return (
		<Container fluid className="error-container">
			<Alert className="error-message" variant="danger">
				<Alert.Heading>Oh no! Something went wrong.</Alert.Heading>
				{!isEmpty(message) && (
					<>
						<hr />
						<h5>{message}</h5>
					</>
				)}
			</Alert>
		</Container>
	);
};
export default ErrorView;
