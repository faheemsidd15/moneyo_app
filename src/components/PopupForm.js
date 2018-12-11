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

import { graphql } from "react-apollo"
import gql from "graphql-tag"

const styles = StyleSheet.create({
	flex: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		paddingTop: 15
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
	checked: false
}

class PopupForm extends Component {
	state = defaultState

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
			response = await this.props.mutate({
				variables: this.state.values
			})
		} catch (err) {
			this.setState({
				errors: {
					email: "Something went wrong"
				},
				isSubmitting: false
			})
			return
		}
		console.log(response)
	}

	render() {
		const {
			errors,
			checked,
			values: { name, amount, type, payDate }
		} = this.state
		console.log(this.state)
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
						<View style={{ paddingTop: 25, backgroundColor: QUINARY, height: "101%", overflow: "hidden" }}>
							<View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", padding: 10 }}>
								<TouchableHighlight
									onPress={() => {
										this.props.close()
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
									value={amount}
									name="amount"
									onChangeText={this.onChangeText}
									isMoney={amount == undefined || amount.length === 0 ? false : true}
								/>
							</View>
							<View style={styles.flex2}>
								<IncomeTypeSelector checked={checked} type={type} value="monthly" onCheckType={this.onCheckType} />

								<IncomeTypeSelector checked={checked} type={type} value="bi-weekly" onCheckType={this.onCheckType} />

								<IncomeTypeSelector checked={checked} type={type} value="weekly" onCheckType={this.onCheckType} />

								<IncomeTypeSelector checked={checked} type={type} value="daily" onCheckType={this.onCheckType} />
							</View>

							<View style={{ height: 150 }}>
								{/* {convert this to hide the date picker} */}
								<Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>Select pay date</Text>
								<DatePickerIOS date={payDate} onDateChange={this.setDate} mode="date" />
							</View>
							<View style={{ paddingTop: 5 }}>
								{/* {change the color of this button} */}
								<Button
									title="Submit"
									rounded
									raised
									buttonStyle={{ backgroundColor: TERTIARY }}
									icon={{ type: "font-awesome", name: "thumbs-o-up" }}
								/>
							</View>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</Modal>
		)
	}
}
export default PopupForm
