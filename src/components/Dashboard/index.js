import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";
import { isEmpty } from "lodash";
import classname from "classnames";
import { Container, Row, Col } from "react-bootstrap";
import "./index.css";
import { STORAGE_META } from "../../constants/keys";
import VerseCollection from "./SavedVerses/VerseCollection";

const VIEW = {
	SAVED_VERSES: 0,
	PROGRESS_CHART: 1,
};

const Dashboard = (props) => {
	const [bibleURL, setBibleURL] = useState("/bible");
	const [savedVerseView, setSavedVerseView] = useState(true);
	const [progressChartView, setProgressChartView] = useState(false);

	const history = useHistory();

	useEffect(() => {
		const storedBookId = localStorage.getItem(STORAGE_META.LATEST_BOOK_ID);
		const storedChapterId = localStorage.getItem(STORAGE_META.LATEST_CHAP_ID);
		if (!isEmpty(storedBookId) && !isEmpty(storedChapterId)) {
			setBibleURL(`/bible/${storedBookId}/${storedChapterId}`);
		}
	}, []);
	const toggleView = (viewEnum) => {
		let savedView = false;
		let progressView = false;
		switch (viewEnum) {
			case VIEW.SAVED_VERSES:
				savedView = true;
				break;
			case VIEW.PROGRESS_CHART:
				progressView = true;
				break;
			default:
				break;
		}
		setSavedVerseView(savedView);
		setProgressChartView(progressView);
	};
	return (
		<Container className="text-center">
			<Link to="/" className="home-link">
				<FontAwesomeIcon icon={faHome} /> Home
			</Link>

			<hr />
			<Row>
				<Col md={4}>
					<div
						className={classname("display-card", { active: savedVerseView })}
						onClick={() => toggleView(VIEW.SAVED_VERSES)}
					>
						<h4 className="display-title">Saved Verses</h4>
					</div>
				</Col>
				<Col md={4}>
					<div
						className={classname("display-card", {
							active: progressChartView,
						})}
						onClick={() => toggleView(VIEW.PROGRESS_CHART)}
					>
						<h4 className="display-title">Progress Chart</h4>
					</div>
				</Col>
				<Col md={4}>
					<div className="display-card" onClick={() => history.push(bibleURL)}>
						<h4 className="display-title">Read the Bible</h4>
					</div>
				</Col>
			</Row>
			{savedVerseView && <VerseCollection />}
		</Container>
	);
};
Dashboard.propTypes = {};
export default Dashboard;
