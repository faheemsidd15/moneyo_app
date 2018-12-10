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
		payDate: undefined
	},
	errors: {},
	isSubmitting: false,
	checked: false,
	date: new Date()
}

class PopupForm extends Component {
	state = defaultState

	setDate = newDate => {
		this.setState(state => ({
			...state,
			date: newDate
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
			date,
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
				<ScrollView>
					<KeyboardAvoidingView>
						<View style={{ paddingTop: 100, backgroundColor: SECONDARY_COLOR, height: "101%" }}>
							<View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", padding: 10 }}>
								<TouchableHighlight
									onPress={() => {
										this.props.close()
									}}
								>
									<Icon name="close" type="font-awesome" color="black" size={30} />
								</TouchableHighlight>
							</View>
							<View />
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

							<View styles={styles.flex}>
								{/* {convert this to hide the date picker} */}
								<Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>Select pay date</Text>
								<DatePickerIOS date={date} onDateChange={this.setDate} mode="date" />
							</View>
							<View style={styles.flex} />
							{/* {change the color of this button} */}
							<Button title="Submit" rounded underlayColor={QUATERNARY} />
						</View>
					</KeyboardAvoidingView>
				</ScrollView>
			</Modal>
		)
	}
}
export default PopupForm
