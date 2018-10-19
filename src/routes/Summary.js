import React from "react"
import { View, Text, AsyncStorage, ScrollView } from "react-native"
import { Button, Card, Tile, Header, Icon, List } from "react-native-elements"
import TestGraph from "../components/TestGraph"
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
					<TestGraph />
				</View>
				<ScrollView style={{ backgroundColor: BACKGROUND, height: "100%" }}>
					<Card
						title="Monthly Income"
						containerStyle={{
							height: 175,
							backgroundColor: CARD_BACKGROUND,
							borderColor: "transparent",
							borderRadius: 25,
							overflow: "hidden"
						}}
						titleStyle={{ fontSize: 20, color: LIGHT_GREEN, textAlign: "center" }}
						dividerStyle={{ backgroundColor: LIGHT_GREEN }}
						//wrapperStyle={{ display: "flex", justifyContent: "center", alignItems: "center" }}
					>
						<View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
							<Text style={{ color: "white", fontSize: 50 }}>$0</Text>
						</View>
					</Card>
					<Card
						title="Monthly Expenses"
						containerStyle={{
							height: 175,
							backgroundColor: CARD_BACKGROUND,
							borderColor: "transparent",
							borderRadius: 25
						}}
						titleStyle={{ fontSize: 20, color: TERTIARY, textAlign: "center" }}
					>
						<Text>HI</Text>
					</Card>
				</ScrollView>
			</View>
		)
	}
}
