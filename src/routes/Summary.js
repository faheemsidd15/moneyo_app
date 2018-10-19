import React from "react"
import { View, Text, AsyncStorage, ScrollView } from "react-native"
import { Button, Card, Tile, Header, Icon, List } from "react-native-elements"
import {
	PRIMARY_COLOR,
	SECONDARY_COLOR,
	TERTIARY,
	QUATERNARY,
	QUINARY,
	LIGHT_GREEN,
	CARD_BACKGROUND,
	BACKGROUND
} from "../AppTheme"

import DefaultHeader from "../components/DefaultHeader"

export default class Summary extends React.Component {
	render() {
		return (
			<View>
				<DefaultHeader showMenu={true} open={this.props.navigation.openDrawer} title="Summary" />

				<View
					style={{
						position: "fixed",
						height: 250,
						backgroundColor: CARD_BACKGROUND,
						borderColor: "transparent",
						borderBottomRadius: 25
					}}
				>
					<Text>HI</Text>
				</View>
				<ScrollView style={{ backgroundColor: BACKGROUND, height: "100%" }}>
					<Card
						title="Total Monthly Income"
						containerStyle={{
							height: 175,
							backgroundColor: SECONDARY_COLOR,
							borderColor: "transparent",
							borderRadius: 25
						}}
						titleStyle={{ fontSize: 20, color: "white", textAlign: "left" }}
					>
						<Text>HI</Text>
					</Card>
					<Card
						title="Total Monthly Income"
						containerStyle={{
							height: 175,
							backgroundColor: "black",
							borderColor: "transparent",
							borderRadius: 25
						}}
						titleStyle={{ fontSize: 20, color: "white", textAlign: "left" }}
					>
						<Text>HI</Text>
					</Card>
				</ScrollView>
			</View>
		)
	}
}
