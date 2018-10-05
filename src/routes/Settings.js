import React from "react"
import { View, Text, AsyncStorage } from "react-native"
import { Button, Card, Tile, Header, Icon, List } from "react-native-elements"

export default class Settings extends React.Component {
	render() {
		return (
			<View style={{ backgroundColor: "rgb(238,238,238)", height: "100%" }}>
				<Header
					leftComponent={<Icon name="menu" onPress={() => this.props.navigation.openDrawer()} color="white" />}
					centerComponent={{ text: "Money-O", style: { color: "white", fontSize: 20 } }}
					backgroundColor="green"
				/>
				<Card title="Summary">
					<View>
						<Text>Hello</Text>
						<Text>From Settings</Text>
					</View>
				</Card>
			</View>
		)
	}
}
