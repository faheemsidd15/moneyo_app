import React from "react"
import { View, Text, AsyncStorage, ScrollView, TouchableHighlight } from "react-native"
import { Button, Card, Tile, Header, Icon, List, ListItem } from "react-native-elements"
import DefaultHeader from "../components/DefaultHeader"
import {
	BACKGROUND,
	LIGHT_GREEN,
	TERTIARY,
	QUATERNARY,
	PRIMARY_COLOR,
	QUINARY,
	SECONDARY_COLOR,
	CARD_BACKGROUND
} from "../AppTheme"
import PopupForm from "../components/PopupForm"
import { GET_INCOMES } from "../Queries"
import { Query } from "react-apollo"
import styled from "styled-components"
import format from "date-fns/format"

const Type = styled(Text)`
	color: ${({ color }) => color};
`

const SHORTHAND_INCOME_TYPES = {
	monthly: {
		value: "M",
		color: "rgba(255, 0, 0, 1)"
	},
	weekly: {
		value: "W",
		color: "rgba(0,255,0,1)"
	},
	biweekly: {
		value: "Bi",
		color: "rgba(0,0,255,1)"
	},
	daily: {
		value: "D",
		color: "rgba(0,0,0,1)"
	}
}

const MyIncomes = ({ onIncomeSelect }) => (
	<Query query={GET_INCOMES}>
		{({ loading, error, data }) => {
			if (loading) return <Text style={{ color: "white" }}>Loading</Text>
			if (error) return `Error! ${error.message}`

			return (
				<List containerStyle={{ margin: 5, backgroundColor: "transparent" }}>
					{data.me.incomes.map(income => (
						<ListItem
							leftIcon={
								<Text
									style={{
										color: SHORTHAND_INCOME_TYPES[income.type].color,
										fontSize: 20,
										paddingRight: 20,
										fontWeight: "800"
									}}
								>
									{SHORTHAND_INCOME_TYPES[income.type].value}
								</Text>
							}
							titleContainerStyle={{ width: 300 }}
							containerStyle={{
								margin: 10,
								backgroundColor: "rgb(255, 255, 255)",
								borderRadius: 10,
								height: 100,
								display: "flex",
								justifyContent: "center",
								alignItems: "center"
							}}
							key={income.id}
							title={income.name}
							titleStyle={{ fontSize: 20, marginBottom: 10 }}
							subtitle={format(income.payDate, "MM/DD/YYYY")}
							subtitleStyle={{ color: "rgba(200,200,200,0.8)", fontWeight: "900" }}
							rightTitle={`$${income.amount}`}
							rightTitleStyle={{ color: LIGHT_GREEN, fontWeight: "900", width: "50%" }}
							onPress={event => onIncomeSelect(income, event)}
						/>
					))}
				</List>
			)
		}}
	</Query>
)

class Income extends React.Component {
	constructor() {
		super()
		this.state = {
			incomes: [],
			activeIncome: undefined,
			modalVisible: false,
			listModalVisible: false
		}
	}

	setModalVisible() {
		this.setState({ modalVisible: true })
	}
	closeModal = () => {
		this.setState({ modalVisible: false })
	}
	setActiveIncome = value => {
		this.setState({ activeIncome: value })
	}

	render() {
		return (
			<View style={{ height: "100%" }}>
				<DefaultHeader
					showMenu={true}
					open={this.props.navigation.openDrawer}
					title="Income"
					showBackButton
					back={() => this.props.navigation.goBack(null)}
				/>
				{this.state.modalVisible && (
					<PopupForm
						visible={this.state.modalVisible}
						close={this.closeModal}
						animation="slide"
						activeIncome={this.state.activeIncome}
						setActiveIncome={this.setActiveIncome}
					/>
				)}
				<ScrollView style={{ backgroundColor: BACKGROUND }}>
					<MyIncomes
						onIncomeSelect={income => {
							console.log(income)
							//this.setModalVisible()
							// Create a function that will handle make the clicked the active income and then based off that create a pop up with that info that can be edited
							this.setActiveIncome(income)
							this.setModalVisible()
						}}
					/>
				</ScrollView>
				<View
					style={{
						height: 100,
						width: "100%",
						position: "relative",
						bottom: 0,
						backgroundColor: PRIMARY_COLOR,
						display: "flex",
						justifyContent: "center",
						alignItems: "center"
					}}
				>
					<TouchableHighlight>
						<Icon
							onPress={() => {
								this.setModalVisible()
							}}
							underlayColor={PRIMARY_COLOR}
							type="entypo"
							name="circle-with-plus"
							color="white"
							size={40}
						/>
					</TouchableHighlight>
					<Text style={{ textAlign: "center", color: "white" }}>Add Income</Text>
				</View>
			</View>
		)
	}
}
export default Income
