import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";
import { isEmpty } from "lodash";
import { Container, Row, Col } from "react-bootstrap";
import "./index.css";
import { STORAGE_META } from "../../constants/keys";

const Dashboard = (props) => {
	const [bibleURL, setBibleURL] = useState("/bible");
	const history = useHistory();

	useEffect(() => {
		const storedBookId = localStorage.getItem(STORAGE_META.LATEST_BOOK_ID);
		const storedChapterId = localStorage.getItem(STORAGE_META.LATEST_CHAP_ID);
		if (!isEmpty(storedBookId) && !isEmpty(storedChapterId)) {
			setBibleURL(`/bible/${storedBookId}/${storedChapterId}`);
		}
	}, []);

	return (
		<Container className="text-center">
			<Link to="/" className="home-link">
				<FontAwesomeIcon icon={faHome} /> Home
			</Link>

			<hr />
			<Row>
				<Col md={4}>
					<div className="display-card">
						<h4 className="display-title">Saved Verses</h4>
					</div>
				</Col>
				<Col md={4}>
					<div className="display-card">
						<h4 className="display-title">Progress Chart</h4>
					</div>
				</Col>
				<Col md={4}>
					<div className="display-card" onClick={() => history.push(bibleURL)}>
						<h4 className="display-title">Read the Bible</h4>
					</div>
				</Col>
			</Row>
		</Container>
	);
};
Dashboard.propTypes = {};
export default Dashboard;
