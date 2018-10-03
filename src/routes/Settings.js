import React from "react"
import { View, Text, AsyncStorage } from "react-native"
import { Button, Card, Tile, Header, Icon, List } from "react-native-elements"

export default class Settings extends React.Component {
	render() {
		return (
			<View style={{ backgroundColor: "rgb(238,238,238)", height: "100%" }}>
				<Header
					centerComponent={{ text: "Money-O", style: { color: "white", fontSize: 20 } }}
					backgroundColor="green"
				/>
				<Card title="Summary">
					<View>
						<Text>Hello</Text>
						<Text>shitbag</Text>
					</View>
				</Card>
			</View>
		)
	}
}
