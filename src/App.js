import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import logo from './tree.png';
import Dashboard from './components/Dashboard';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useLocation,
} from 'react-router-dom';
import { Container, Card, Menu } from 'semantic-ui-react';
import ReadingView from './components/Reading';
import { STORAGE_META } from './constants/keys';
import Login from './components/Login/Login';
import { useUserContext } from './contexts/WithUserProfile';

const HomePage = (props) => {
	const [bibleURL, setBibleURL] = useState('/bible');
	const [user] = useUserContext();

	useEffect(() => {
		const storedBookId = localStorage.getItem(STORAGE_META.LATEST_BOOK_ID);
		const storedChapterId = localStorage.getItem(STORAGE_META.LATEST_CHAP_ID);
		if (!isEmpty(storedBookId) && !isEmpty(storedChapterId)) {
			setBibleURL(`/bible/${storedBookId}/${storedChapterId}`);
		}
	}, []);

	if (isEmpty(user)) {
		return <Login />;
	}

	return (
		<Container>
			<Dashboard />
		</Container>
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
				<Route exact path="/bible" component={ReadingView} />
				<Route path="/bible/:bookId/:chapterId" component={ReadingView} />
				<Route path="*" component={ErrorPage} />
			</Switch>
		</Router>
	);
}

export default App;
