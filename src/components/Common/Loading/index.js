import React from "react";
import { Container, Spinner } from "react-bootstrap";
import "./index.css";

const LoadingView = ({ label = "Loading..." }) => {
	return (
		<Container fluid className="loading-container">
			<h3>{label}</h3>
			<br />
			<Spinner animation="border" />
		</Container>
	);
};
export default LoadingView;
