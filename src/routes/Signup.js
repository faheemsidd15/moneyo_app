import React, { Component } from "react"
import { View, StyleSheet } from "react-native"
import { Button, FormInput, Header } from "react-native-elements"

import { Icon } from "react-native-vector-icons/FontAwesome"

const styles = StyleSheet.create({
	field: {
		fontSize: 20,
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: "red"
	}
})

export default class Signup extends Component {
	state = {
		values: {
			name: "",
			email: "",
			password: ""
		},
		errors: {},
		isSubmitting: {}
	}
	onChangeText = (key, value) => {
		this.setState(state => ({
			values: {
				...state.values,
				[key]: value
			}
		}))
	}
	submit = () => {}

	/* TODO Change the font for MONEYO */
	render() {
		const {
			values: { name, email, password }
		} = this.state

		return (
			<View style={{ width: "100%", height: "100%" }}>
				<Header centerComponent={{ text: "Money-O", style: { color: "white", fontSize: 20 } }} backgroundColor="red" />
				<View
					style={{
						flex: 1,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "rgb(238, 238, 238)"
					}}
				>
					<View style={{ width: 200 }}>
						<FormInput
							onChangeText={text => this.onChangeText("name", text)}
							value={name}
							placeholder="name"
							style={styles.field}
						/>
						<FormInput
							onChangeText={text => this.onChangeText("email", text)}
							value={email}
							style={styles.field}
							placeholder="email"
						/>
						<FormInput
							onChangeText={text => this.onChangeText("password", text)}
							value={password}
							style={styles.field}
							placeholder="password"
							secureTextEntry
						/>
						<Button title="Create Account" onPress={this.submit} />
					</View>
				</View>
			</View>
		)
	}
}
