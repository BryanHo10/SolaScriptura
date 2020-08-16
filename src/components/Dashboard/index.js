import React, { useState, useEffect } from "react";
import response from "../../api/scripture.mock";
import { Link } from "react-router-dom";
import SelectionView from "../Reading/Selection";
import { Container } from "react-bootstrap";

const Dashboard = (props) => {
	const [passages, setPassages] = useState([]);
	useEffect(() => {
		setPassages(response.passages);
	}, []);

	return (
		<Container fluid>
			<Link to="/">Home</Link>
			<SelectionView />
		</Container>
	);
};
Dashboard.propTypes = {};
export default Dashboard;
