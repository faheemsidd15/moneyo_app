import React, { Component } from "react"
import { Modal, Text, TouchableHighlight, View, Alert, KeyboardAvoidingView, StyleSheet } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { Icon } from "react-native-elements"
import { BACKGROUND, LIGHT_GREEN, TERTIARY, QUATERNARY, PRIMARY_COLOR, QUINARY, SECONDARY_COLOR } from "../AppTheme"
import TextField from "../components/TextField"

import { graphql } from "react-apollo"
import gql from "graphql-tag"

const styles = StyleSheet.create({
	flex: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		paddingTop: 15
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
	isSubmitting: false
}

class PopupForm extends Component {
	state = defaultState

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
				<ScrollView>
					<KeyboardAvoidingView>
						<View style={{ paddingTop: 100, backgroundColor: SECONDARY_COLOR, height: 400 }}>
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
								<TextField value={name} name="name" onChangeText={this.onChangeText} />
							</View>
						</View>
					</KeyboardAvoidingView>
				</ScrollView>
			</Modal>
		)
	}
}
export default PopupForm
