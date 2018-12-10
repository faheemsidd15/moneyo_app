import React from "react"
import { View, Text, AsyncStorage, ScrollView, TouchableHighlight } from "react-native"
import { Button, Card, Tile, Header, Icon, List, ListItem } from "react-native-elements"
import DefaultHeader from "../components/DefaultHeader"
import { BACKGROUND, LIGHT_GREEN, TERTIARY, QUATERNARY, PRIMARY_COLOR, QUINARY, SECONDARY_COLOR } from "../AppTheme"
import PopupForm from "../components/PopupForm"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import styled from "styled-components"

const Type = styled(Text)`
	color: ${({ color }) => color};
`

const GET_INCOMES = gql`
	{
		me {
			incomes {
				id
				name
				amount
				type
				payDate
			}
		}
	}
`

const SHORTHAND_INCOME_TYPES = {
	monthly: {
		value: "M",
		color: "rgba(255, 0, 0, 1)"
	}
}

const MyIncomes = ({ onIncomeSelect }) => (
	<Query query={GET_INCOMES}>
		{({ loading, error, data }) => {
			if (loading) return "Loading..."
			if (error) return `Error! ${error.message}`

			return (
				<List containerStyle={{ margin: 5 }}>
					{data.me.incomes.map(
						income =>
							console.log(income.type) || (
								<ListItem
									hideChevron
									leftIcon={
										<Text style={{ color: SHORTHAND_INCOME_TYPES[income.type].color }}>
											{SHORTHAND_INCOME_TYPES[income.type].value}
										</Text>
									}
									key={income.id}
									title={income.name}
									subtitle={`$${income.amount}`}
									subtitleStyle={{ color: LIGHT_GREEN, fontWeight: "900" }}
									rightTitle={income.type}
									onPress={onIncomeSelect}
								/>
							)
					)}
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

	render() {
		return (
			<View style={{ height: "100%" }}>
				<DefaultHeader showMenu={true} open={this.props.navigation.openDrawer} title="Income" />
				<PopupForm visible={this.state.modalVisible} close={this.closeModal} animation="slide" />
				<ScrollView style={{ backgroundColor: BACKGROUND }}>
					<MyIncomes
						onIncomeSelect={() => {
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
