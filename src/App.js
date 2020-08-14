import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const HomePage = (props) => (
	<div className="App">
		<header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<p>
				Edit <code>src/App.js</code> and save to reload.
			</p>

			<Link to="/memorize" className="App-link">
				Memorize
			</Link>
		</header>
	</div>
);
function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<HomePage />
				</Route>
				<Route exact path="/memorize">
					<Dashboard />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
