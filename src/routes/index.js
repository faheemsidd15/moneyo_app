import React from "react"
import { NativeRouter, Route, Switch } from "react-router-native"

import Signup from "./Signup"
import Login from "./Login"
import App from "./App"
import CheckToken from "./CheckToken"

export default () => (
	<NativeRouter>
		<Switch>
			<Route exact path="/" component={CheckToken} />
			<Route exact path="/signup" component={Signup} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/app" component={App} />
		</Switch>
	</NativeRouter>
)
