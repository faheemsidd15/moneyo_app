import React, { Component } from "react"
import { AsyncStorage, Text, View, StyleSheet, KeyboardAvoidingView } from "react-native"
import { Button, Card, Tile, FormInput, Header, Icon } from "react-native-elements"

import { graphql } from "react-apollo"
import gql from "graphql-tag"

const styles = StyleSheet.create({
	field: {
		width: 200,
		fontSize: 20,
		color: "black",
		borderBottomWidth: 1
	},
	flex: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center"
	}
})

const defaultState = {
	values: {
		name: "",
		email: "",
		password: ""
	},
	errors: {},
	isSubmitting: false
}

class Signup extends Component {
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
					email: "This email is already taken"
				},
				isSubmitting: false
			})
			return
		}
		console.log(response)
		await AsyncStorage.setItem("@moneyo/token", response.data.signup.token)
		this.setState(defaultState)
	}

	goToLoginPage = () => {
		this.props.history.push("/login")
	}

	/* TODO Change the font for MONEYO */
	render() {
		const {
			errors,
			values: { name, email, password }
		} = this.state

		return (
			<KeyboardAvoidingView style={{ width: "100%", height: "100%" }} behavior="padding">
				<Header
					centerComponent={{ text: "Money-O", style: { color: "white", fontSize: 20 } }}
					backgroundColor="green"
				/>
				<View>
					<Tile
						imageSrc={require("../assets/images/photo.png")}
						title="Sign up"
						featured
						titleStyle={{ fontSize: 50, color: "white" }}
						height={160}
					/>
				</View>
				<View
					style={{
						flex: 1,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "rgb(205, 205, 205)"
					}}
				>
					<View style={{ width: 300 }}>
						<View style={styles.flex}>
							<FormInput
								onChangeText={text => this.onChangeText("name", text)}
								value={name}
								placeholder="name"
								inputStyle={styles.field}
								placeholderTextColor="white"
							/>
							<Icon name="user" type="font-awesome" color="white" />
						</View>
						/* Change the padding of the error message */
						{errors.email && <Text style={{ textAlign: "center", color: "red" }}>{errors.email}</Text>}
						<View style={styles.flex}>
							<FormInput
								onChangeText={text => this.onChangeText("email", text)}
								value={email}
								inputStyle={styles.field}
								placeholder="email"
								placeholderTextColor="white"
								autoCapitalize="none"
							/>
							<Icon name="envelope" type="font-awesome" color="white" />
						</View>
						<View style={styles.flex}>
							<FormInput
								onChangeText={text => this.onChangeText("password", text)}
								value={password}
								inputStyle={styles.field}
								placeholder="password"
								placeholderTextColor="white"
								autoCapitalize="none"
								secureTextEntry
							/>
							<Icon name="lock" type="font-awesome" color="white" />
						</View>
						<View
							style={{
								width: "100%",
								paddingTop: 30
							}}
						>
							<Button title="Create Account" onPress={this.submit} rounded={true} backgroundColor="green" />
							<Button
								title="Already have an account?"
								backgroundColor="transparent"
								color="blue"
								onPress={this.goToLoginPage}
							/>
						</View>
					</View>
				</View>
			</KeyboardAvoidingView>
		)
	}
}

const signUpMutation = gql`
	mutation($name: String!, $email: String!, $password: String!) {
		signup(name: $name, email: $email, password: $password) {
			token
		}
	}
`

export default graphql(signUpMutation)(Signup)
