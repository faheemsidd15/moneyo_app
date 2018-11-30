import React from "react"
import { View, Text, AsyncStorage, ScrollView } from "react-native"
import { Button, Card, Tile, Header, Icon, List } from "react-native-elements"
import TestGraph from "../components/TestGraph"
import gql from "graphql-tag"
import { Query } from "react-apollo"
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

const totalIncome = gql`
	{
		totalIncome
	}
`

export default class Summary extends React.Component {
	render() {
		return (
			<View style={{ height: "100%" }}>
				<DefaultHeader showMenu={true} open={this.props.navigation.openDrawer} title="Summary" />

				<View
					style={{
						height: 175,
						backgroundColor: CARD_BACKGROUND
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
						<View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
							<View
								style={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center"
								}}
							>
								<Icon
									type="font-awesome"
									name="plus"
									color={LIGHT_GREEN}
									style={{ paddingRighteft: 50 }}
									onPress={() => this.props.navigation.navigate("Income")}
								/>
								<Text style={{ color: LIGHT_GREEN }}>Add Income</Text>
							</View>

							<Query query={totalIncome}>
								{({ loading, data }) => {
									if (loading) {
										return null
									}
									return <Text style={{ color: "white", fontSize: 50 }}>${data.totalIncome}</Text>
								}}
							</Query>

							<View />
						</View>
					</Card>
					<Card
						title="Monthly Expenses"
						containerStyle={{
							height: 175,
							backgroundColor: CARD_BACKGROUND,
							borderColor: "transparent",
							borderRadius: 25,
							overflow: "hidden"
						}}
						titleStyle={{ fontSize: 20, color: TERTIARY, textAlign: "center" }}
						dividerStyle={{ backgroundColor: TERTIARY }}

						//wrapperStyle={{ display: "flex", justifyContent: "center", alignItems: "center" }}
					>
						<View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
							<View
								style={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center"
								}}
							>
								<Icon
									type="font-awesome"
									name="plus"
									color={TERTIARY}
									style={{ paddingRighteft: 50 }}
									onPress={() => this.props.navigation.navigate("Income")}
								/>
								<Text style={{ color: TERTIARY }}>Add Income</Text>
							</View>
							<Text style={{ color: "white", fontSize: 50 }}>$0</Text>
							<View />
						</View>
					</Card>
				</ScrollView>
			</View>
		)
	}
}
