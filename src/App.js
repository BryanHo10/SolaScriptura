import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import logo from './tree.png';
import './App.css';
import Dashboard from './components/Dashboard';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useLocation,
} from 'react-router-dom';
import ReadingView from './components/Reading';
import { Container, Row, Col } from 'react-bootstrap';
import { STORAGE_META } from './constants/keys';
import Login from './components/Login/Login';

const HomePage = (props) => {
	const [bibleURL, setBibleURL] = useState('/bible');

	useEffect(() => {
		const storedBookId = localStorage.getItem(STORAGE_META.LATEST_BOOK_ID);
		const storedChapterId = localStorage.getItem(STORAGE_META.LATEST_CHAP_ID);
		if (!isEmpty(storedBookId) && !isEmpty(storedChapterId)) {
			setBibleURL(`/bible/${storedBookId}/${storedChapterId}`);
		}
	}, []);

	return <Login />;
	return (
		<div className="App">
			<header className="App-header">
				<Container>
					<p>
						All Scripture is breathed out by God and profitable for teaching,
						for reproof, for correction, and for training in righteousness, that
						the man of God may be complete, equipped for every good work.
					</p>
					<Row>
						<Col>
							<img src={logo} className="App-logo" alt="tree" />
						</Col>
						<Col className="navigate-link-container">
							<div className="link-box">
								<Link to="/dashboard" className="App-link">
									Go to Dashboard
								</Link>
							</div>

							<div className="link-box">
								<Link to={bibleURL} className="App-link">
									Go to Bible
								</Link>
							</div>
						</Col>
					</Row>
				</Container>
			</header>
		</div>
	);
};
const ErrorPage = () => {
	const location = useLocation();
	return (
		<div className="App">
			<header className="App-header">
				<p>
					No page at <code>{location.pathname}</code>
				</p>
			</header>
		</div>
	);
};
function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route exact path="/dashboard" component={Dashboard} />
				<Route exact path="/bible" component={ReadingView} />
				<Route path="/bible/:bookId/:chapterId" component={ReadingView} />
				<Route path="*" component={ErrorPage} />
			</Switch>
		</Router>
	);
}

export default App;
