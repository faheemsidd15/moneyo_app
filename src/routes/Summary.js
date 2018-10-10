import React from "react"
import { View, Text, AsyncStorage, ScrollView } from "react-native"
import { Button, Card, Tile, Header, Icon, List } from "react-native-elements"
import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY, QUATERNARY, QUINARY, LIGHT_GREEN } from "../AppTheme"

import DefaultHeader from "../components/DefaultHeader"

export default class Summary extends React.Component {
	render() {
		return (
			<View>
				<DefaultHeader showMenu={true} open={this.props.navigation.openDrawer} />
				<ScrollView style={{ backgroundColor: LIGHT_GREEN, height: "100%" }}>
					<Card
						title="Summary"
						containerStyle={{ height: 400, backgroundColor: "white" }}
						titleStyle={{ fontSize: 40, color: "black" }}
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
