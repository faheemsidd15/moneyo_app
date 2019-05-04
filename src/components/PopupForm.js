import React, { Component } from "react"
import {
	Modal,
	Text,
	TouchableHighlight,
	View,
	Alert,
	KeyboardAvoidingView,
	StyleSheet,
	DatePickerIOS
} from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { Icon, Button } from "react-native-elements"
import { BACKGROUND, LIGHT_GREEN, TERTIARY, QUATERNARY, PRIMARY_COLOR, QUINARY, SECONDARY_COLOR } from "../AppTheme"
import TextField from "../components/TextField"
import InputField from "../components/InputField"
import IncomeTypeSelector from "../components/IncomeTypeSelector"
import parse from "date-fns/parse"
import { GET_INCOMES, TOTAL_MONTHLY_INCOME } from "../Queries"
import { graphql, withApollo, compose } from "react-apollo"
import gql from "graphql-tag"
import { KnownTypeNamesRule } from "graphql"

const styles = StyleSheet.create({
	flex: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		paddingTop: 5
	},
	flex2: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
		maxHeight: 150,
		flexWrap: "wrap"
	}
})

const defaultState = {
	values: {
		name: "",
		amount: undefined,
		type: "",
		payDate: new Date()
	},
	errors: {},
	isSubmitting: false,
	isDeleting: false,
	checked: false
}

class PopupForm extends Component {
	constructor(props) {
		super(props)
		this.state = defaultState

		if (props.activeIncome) {
			this.state = {
				checked: true,
				values: props.activeIncome
			}
		}
	}

	resetState = () => {
		this.props.setActiveIncome(undefined)
		this.setState(state => ({
			...state,
			values: defaultState.values,
			isSubmitting: false,
			isDeleting: false
		}))
	}

	setDate = newDate => {
		this.setState(state => ({
			...state,
			values: {
				...state.values,
				payDate: newDate
			}
		}))
	}

	onCheckType = value => {
		this.setState(state => ({
			checked: state.values.type !== value,
			values: {
				...state.values,
				type: state.values.type !== value ? value : undefined
			}
		}))
	}

	onChangeText = (key, value) => {
		this.setState(state => ({
			values: {
				...state.values,
				[key]: value
			}
		}))
	}

	submit = async () => {
		if (this.state.isSubmitting) {
			return
		}
		this.setState({
			isSubmitting: true
		})
		let response
		try {
			await this.props.mutate({
				mutation: createIncomeMutation,
				variables: {
					input: this.state.values
				},
				update: (store, { data: { createIncome } }) => {
					console.log("THis is createIncome", createIncome)
					// Read the data from our cache for this query.
					const data = store.readQuery({ query: GET_INCOMES })
					console.log("This is data", data)
					// Add our comment from the mutation to the end.
					data.me.incomes.push(createIncome)
					// Write our data back to the cache.
					store.writeQuery({ query: GET_INCOMES, data })
					//store.writeQuery({ query: TOTAL_MONTHLY_INCOME, data })
				}
			})
		} catch (err) {
			this.setState({
				errors: {
					name: "Something went wrong"
				},
				isSubmitting: false
			})
			return
		}
		this.props.close()
	}

	deleteIncome = async value => {
		if (this.state.isDeleting) {
			return
		}
		this.setState({
			isDeleting: true
		})
		let response
		try {
			await this.props.mutate({
				mutation: deleteIncomeMutaton,
				variables: {
					id: value
				},
				update: (store, { data: { deleteIncome } }) => {
					const data = store.readQuery({ query: GET_INCOMES })
					// console.log("This is the data after delete", data)
					// console.log("this is the response from deleate income", deleteIncome)

					data.me.incomes = data.me.incomes.filter(x => x.id != deleteIncome.id)

					store.writeQuery({ query: GET_INCOMES, data })
				}
			})
		} catch (err) {
			this.setState({
				errors: {
					name: "Something went wrong when Deleting"
				},
				isDeleting: false
			})
			return
		}

		this.props.close()
	}

	componentWillUnmount() {
		this.resetState()
	}

	render() {
		console.log("This is the current state", this.state)
		console.log("PROPS", this.props)
		const {
			errors,
			checked,
			values: { name, amount, type, payDate }
		} = this.state
		return (
			<Modal
				animationType={this.props.animation}
				transparent={true}
				visible={this.props.visible}
				onRequestClose={() => {
					Alert.alert("Modal has been closed.")
				}}
			>
				<KeyboardAvoidingView style={{ width: "100%", height: "100%" }} behavior="padding">
					<ScrollView>
						<View style={{ paddingTop: 25, backgroundColor: SECONDARY_COLOR, height: "105%", overflow: "hidden" }}>
							<View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", padding: 10 }}>
								<TouchableHighlight
									onPress={() => {
										this.props.close()
										this.resetState()
									}}
								>
									<Icon name="close" type="font-awesome" color="black" size={30} />
								</TouchableHighlight>
							</View>

							<View style={{ display: "flex", justifyContent: "center", flexDirection: "row" }}>
								<Text style={{ color: "white", fontSize: 30 }}>Create An Income</Text>
							</View>
							<View style={styles.flex}>
								<TextField value={name} name="name" onChangeText={this.onChangeText} width={320} />
							</View>
							<View style={styles.flex}>
								<InputField
									width={320}
									value={this.props.activeIncome ? amount.toString() : amount}
									name="amount"
									onChangeText={this.onChangeText}
									isMoney={amount == undefined || amount.length === 0 ? false : true}
								/>
							</View>
							<View style={styles.flex2}>
								<IncomeTypeSelector checked={checked} type={type} value="monthly" onCheckType={this.onCheckType} />

								<IncomeTypeSelector checked={checked} type={type} value="biweekly" onCheckType={this.onCheckType} />

								<IncomeTypeSelector checked={checked} type={type} value="weekly" onCheckType={this.onCheckType} />

								<IncomeTypeSelector checked={checked} type={type} value="daily" onCheckType={this.onCheckType} />
							</View>

							<View style={{ height: 160 }}>
								{/* {convert this to hide the date picker} */}
								<Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>Select pay date</Text>
								<DatePickerIOS date={parse(payDate)} onDateChange={this.setDate} mode="date" />
							</View>
							<View style={{ paddingTop: 5 }}>
								{/* {change the color of this button} */}
								<Button
									title={this.props.activeIncome ? "Update" : "Submit"}
									rounded
									raised
									buttonStyle={{ backgroundColor: TERTIARY }}
									icon={{ type: "font-awesome", name: "thumbs-o-up" }}
									onPress={this.submit}
								/>
								{this.props.activeIncome && (
									<Button
										title="Delete"
										rounded
										raised
										buttonStyle={{ backgroundColor: QUATERNARY, marginTop: 10 }}
										icon={{
											type: "font-awesome",
											name: "trash-o"
										}}
										onPress={() => this.deleteIncome(this.state.values.id)}
									/>
								)}
							</View>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</Modal>
		)
	}
}

const createIncomeMutation = gql`
	mutation CreateIncome($input: CreateIncomeInput!) {
		createIncome(input: $input) {
			id
			name
			amount
			type
			payDate
			user {
				id
			}
		}
	}
`
const deleteIncomeMutaton = gql`
	mutation deleteIncome($id: ID!) {
		deleteIncome(id: $id) {
			id
		}
	}
`

export default compose(
	graphql(createIncomeMutation),
	graphql(deleteIncomeMutaton)
)(PopupForm)
