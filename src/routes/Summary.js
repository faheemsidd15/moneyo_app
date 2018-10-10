import React from "react"
import { View, Text, AsyncStorage, ScrollView } from "react-native"
import { Button, Card, Tile, Header, Icon, List } from "react-native-elements"

import DefaultHeader from "../components/DefaultHeader"

export default class Summary extends React.Component {
	render() {
		return (
			<View>
				<DefaultHeader showMenu={true} open={this.props.navigation.openDrawer} />
				<ScrollView style={{ backgroundColor: "rgb(238,238,238)", height: "100%" }}>
					<Card
						title="Summary"
						containerStyle={{ height: 400, backgroundColor: "rgba(186, 179, 223, 1)" }}
						titleStyle={{ fontSize: 40 }}
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
