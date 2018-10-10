import React, { Component } from "react"
import { AsyncStorage, Text, View, StyleSheet, KeyboardAvoidingView } from "react-native"
import { Button, Card, Tile, Header, Icon } from "react-native-elements"
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../AppTheme"

import { graphql } from "react-apollo"
import gql from "graphql-tag"

import TextField from "../components/TextField"
import { TOKEN_KEY } from "../constants"

const styles = StyleSheet.create({
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
		await AsyncStorage.setItem(TOKEN_KEY, response.data.signup.token)
		//this.setState(defaultState)
		this.props.history.push("/app")
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
					backgroundColor={PRIMARY_COLOR}
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
							<TextField value={name} name="name" onChangeText={this.onChangeText} />
							<Icon name="user" type="font-awesome" color="white" />
						</View>
						/* Change the padding of the error message */
						{errors.email && <Text style={{ textAlign: "center", color: "red" }}>{errors.email}</Text>}
						<View style={styles.flex}>
							<TextField value={email} name="email" onChangeText={this.onChangeText} />
							<Icon name="envelope" type="font-awesome" color="white" />
						</View>
						<View style={styles.flex}>
							<TextField value={password} name="password" onChangeText={this.onChangeText} secureTextEntry />
							<Icon name="lock" type="font-awesome" color="white" />
						</View>
						<View
							style={{
								width: "100%",
								paddingTop: 30
							}}
						>
							<Button title="Create Account" onPress={this.submit} rounded={true} backgroundColor={SECONDARY_COLOR} />
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
