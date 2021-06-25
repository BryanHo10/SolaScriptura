import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import Dashboard from './components/Dashboard';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useLocation,
} from 'react-router-dom';
import ReadingView from './components/Reading';
import Login from './components/Login/Login';
import { useUserContext } from './contexts/WithUserProfile';

const HomePage = (props) => {
	const [bibleURL, setBibleURL] = useState('/bible');
	const [user] = useUserContext();

	if (isEmpty(user)) {
		return <Login />;
	}

	return (
		<>
			<Router>
				<Switch>
					<Route exact path="/" component={Dashboard} />
					<Route exact path="/bible" component={ReadingView} />
					<Route path="/bible/:bookId/:chapterId" component={ReadingView} />
					<Route path="*" component={ErrorPage} />
				</Switch>
			</Router>
		</>
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

export default HomePage;
