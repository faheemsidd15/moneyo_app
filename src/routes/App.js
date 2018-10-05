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

const CustomDrawerComponent = props => (
	<SafeAreaView style={{ flex: 1 }}>
		<View style={{ height: 150, backgroundColor: "green" }}>
			<Text style={{ color: "white" }}>Insert Image or Name Here</Text>
		</View>
		<ScrollView>
			<DrawerItems {...props} />
		</ScrollView>
	</SafeAreaView>
)

const AppDrawer = createDrawerNavigator(
	{
		Home: Summary,
		Settings: Settings
	},
	{
		contentComponent: CustomDrawerComponent
	}
)
export default App
