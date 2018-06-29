import React from "react"
import { View, Text } from "react-native"
import { Button, Card, Tile, Header, Icon } from "react-native-elements"

export default class Signup extends React.Component {
	render() {
		return (
			<View>
				<Header
					centerComponent={{ text: "Money-O", style: { color: "white", fontSize: 20 } }}
					backgroundColor="green"
				/>
			</View>
		)
	}
}
