import React from "react";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Users from "./components/Users";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
	return (
		<Router>
			<div className='App'>
				<Switch>
					<Route exact path='/login' component={Login} />
					<Route path='/register' component={Register} />
					<ProtectedRoute path='/users' component={Users} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
