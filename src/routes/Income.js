import React from "react"
import { View, Text, AsyncStorage, ScrollView } from "react-native"
import { Button, Card, Tile, Header, Icon, List } from "react-native-elements"
import DefaultHeader from "../components/DefaultHeader"
import { BACKGROUND } from "../AppTheme"

class Income extends React.Component {
	constructor() {
		super()
		this.state = {
			incomes: []
		}
	}

	render() {
		return (
			<View>
				<DefaultHeader showMenu={true} open={this.props.navigation.openDrawer} title="Settings" />
				<ScrollView style={{ backgroundColor: BACKGROUND, height: "100%" }}>
					<Card title="Summary">
						<View>
							<Text>Hello</Text>
							<Text>From Income</Text>
						</View>
					</Card>
				</ScrollView>
			</View>
		)
	}
}
export default Income
