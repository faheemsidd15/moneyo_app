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
				<ScrollView style={{ backgroundColor: BACKGROUND, height: "100%" }}>
					<Card
						title="Total Monthly Savings"
						containerStyle={{
							height: 400,
							backgroundColor: CARD_BACKGROUND,
							borderColor: "transparent",
							borderRadius: 25
						}}
						titleStyle={{ fontSize: 30, color: "white", textAlign: "left" }}
					>
						<Text>HI</Text>
					</Card>
					<Card title="Total Ratio">
						<View>
							<Text>Hello</Text>
						</View>
					</Card>
				</ScrollView>
			</View>
		)
	}
}
