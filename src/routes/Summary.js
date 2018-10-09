import React from "react"
import { View, Text, AsyncStorage, ScrollView } from "react-native"
import { Button, Card, Tile, Header, Icon, List } from "react-native-elements"
import Settings from "./Settings.js"

import DefaultHeader from "../components/DefaultHeader"

export default class Summary extends React.Component {
	render() {
		return (
			<ScrollView>
				<View style={{ backgroundColor: "rgb(238,238,238)", height: "100%" }}>
					{/* <Header
						leftComponent={<Icon name="menu" onPress={() => this.props.navigation.openDrawer()} color="white" />}
						centerComponent={{ text: "Money-O", style: { color: "white", fontSize: 20 } }}
						backgroundColor="green"	
					/> */}
					<DefaultHeader showMenu={true} open={this.props.navigation.openDrawer} />
					<Card title="Summary" containerStyle={{ height: 400 }} titleStyle={{ fontSize: 40 }}>
						<View
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
								backgroundColor: "red"
							}}
						>
							<View style={{ width: 100, height: 100, backgroundColor: "green" }}>
								<Text>One section</Text>
							</View>
							<View style={{ width: 100, height: 100, backgroundColor: "purple" }}>
								<Text>Second Section</Text>
							</View>
						</View>
					</Card>
					<Card title="Total Ratio">
						<View>
							<Text>Hello</Text>
						</View>
					</Card>
				</View>
			</ScrollView>
		)
	}
}
