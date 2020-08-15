import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./components/Dashboard";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useLocation,
} from "react-router-dom";
import ReadingView from "./components/Reading";

const HomePage = (props) => (
	<div className="App">
		<header className="App-header">
			<Link to="/memorize" className="App-link">
				Go to Memorize
			</Link>
			<Link to="/bible" className="App-link">
				Go to Bible
			</Link>
			<img src={logo} className="App-logo" alt="logo" />
			<p>
				Edit <code>src/App.js</code> and save to reload.
			</p>
		</header>
	</div>
);
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
				<Route exact path="/memorize" component={Dashboard} />
				<Route exact path="/bible" component={ReadingView} />
				<Route path="/bible/:bookId/:chapterId" component={ReadingView} />
				<Route path="*" component={ErrorPage} />
			</Switch>
		</Router>
	);
}

export default App;
