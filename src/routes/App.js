import React, { Component } from "react"
import { View, Text, AsyncStorage, SafeAreaView, ScrollView, Dimensions } from "react-native"
import { Button, Card, Tile, Header, Icon, List } from "react-native-elements"
import { createDrawerNavigator, DrawerItems } from "react-navigation"

import Settings from "./Settings.js"
import Summary from "./Summary.js"

class App extends Component {
	render() {
		return <AppDrawer />
	}
}

const AppDrawer = createDrawerNavigator({
	Home: Summary,
	Settings: Settings
})
export default App
