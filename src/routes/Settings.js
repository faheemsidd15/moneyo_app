import React from "react"
import { View, Text, AsyncStorage, ScrollView } from "react-native"
import { Button, Card, Tile, Header, Icon, List } from "react-native-elements"
import DefaultHeader from "../components/DefaultHeader"

export default class Settings extends React.Component {
	render() {
		return (
			<View>
				<DefaultHeader showMenu={true} open={this.props.navigation.openDrawer} />
				<ScrollView style={{ backgroundColor: "rgb(238,238,238)", height: 500 }}>
					<Card title="Summary">
						<View>
							<Text>Hello</Text>
							<Text>From Settings</Text>
						</View>
					</Card>
				</ScrollView>
			</View>
		)
	}
}
