import React from "react"
import { View, Text, AsyncStorage } from "react-native"
import { Button, Card, Tile, Header, Icon, List } from "react-native-elements"

export default class Signup extends React.Component {
	render() {
		return (
			<View style={{ backgroundColor: "red", height: "100%" }}>
				<Header
					centerComponent={{ text: "Money-O", style: { color: "white", fontSize: 20 } }}
					backgroundColor="green"
				/>
				<Card title="Summary">
					<View>
						<Text>Hello</Text>
						<Text>Fucker</Text>
					</View>
				</Card>
			</View>
		)
	}
}
