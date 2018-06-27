import React from "react"
import { NativeRouter, Route, Switch } from "react-router-native"

import Signup from "./Signup"
import Login from "./Login"
import Summary from "./Summary"

export default () => (
	<NativeRouter>
		<Switch>
			<Route exact path="/signup" component={Signup} />
			<Route exact path="/" component={Login} />
			<Route exact path="/summary" component={Summary} />
		</Switch>
	</NativeRouter>
)
