import React from "react";
import "./App.css";
import Register from "./components/Register";
import Users from "./components/Users";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
	return (
		<Router>
			<div className='App'>
				<Switch>
					{/* <Route patch='/' exact component={Login} /> */}

					<Route patch='/register' component={Register} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
