import React from "react"
import { View, Text, AsyncStorage, ScrollView } from "react-native"
import { Button, Card, Tile, Header, Icon, List } from "react-native-elements"
import DefaultHeader from "../components/DefaultHeader"
import { BACKGROUND, LIGHT_GREEN } from "../AppTheme"

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
				<DefaultHeader showMenu={true} open={this.props.navigation.openDrawer} title="Income" />

				<ScrollView style={{ backgroundColor: BACKGROUND, height: "75%" }}>
					<Card title="Summary">
						<View>
							<Text>Hello</Text>
							<Text>From Income</Text>
						</View>
					</Card>
				</ScrollView>
				<View style={{ height: 100, width: "100%" }}>
					<Icon type="font-awesome" name="plus" color={LIGHT_GREEN} />
				</View>
			</View>
		)
	}
}
export default Income
