import React, { Component } from "react"
import { AsyncStorage, Text, View, StyleSheet, KeyboardAvoidingView } from "react-native"
import { Button, Card, Tile, Header, Icon } from "react-native-elements"
import { TOKEN_KEY } from "../constants"
import { graphql } from "react-apollo"
import gql from "graphql-tag"
import TextField from "../components/TextField"
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../AppTheme"

const styles = StyleSheet.create({
	flex: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		paddingTop: 25
	}
})

const defaultState = {
	values: {
		email: "",
		password: ""
	},
	errors: {},
	isSubmitting: false
}

class Login extends Component {
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

		const response = await this.props.mutate({
			variables: this.state.values
		})

		const { payload, error } = response.data.login

		if (payload) {
			console.log(payload.token)
			console.log(payload)
			await AsyncStorage.setItem(TOKEN_KEY, payload.token)
			//this.setState(defaultState)
			this.props.history.push("/app")
		} else {
			this.setState({
				errors: {
					[error.field]: error.msg
				},
				isSubmitting: false
			})
		}
	}

	goToSignupPage = () => {
		this.props.history.push("/signup")
	}

	/* TODO Change the font for MONEYO */
	render() {
		const {
			errors,
			values: { email, password }
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
						title="Login"
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
						{/* Change the padding of the error message */}
						{errors.email && <Text style={{ textAlign: "center", color: "red" }}>{errors.email}</Text>}
						<View style={styles.flex}>
							<TextField value={email} name="email" onChangeText={this.onChangeText} />
							<Icon name="envelope" type="font-awesome" color="white" />
						</View>
						{errors.password && <Text style={{ textAlign: "center", color: "red" }}>{errors.password}</Text>}
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
							<Button title="Login" onPress={this.submit} rounded={true} backgroundColor={SECONDARY_COLOR} />
							<Button
								title="Don't have an account?"
								backgroundColor="transparent"
								color="blue"
								onPress={this.goToSignupPage}
							/>
						</View>
					</View>
				</View>
			</KeyboardAvoidingView>
		)
	}
}

const loginMutation = gql`
	mutation($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			payload {
				token
			}
			error {
				field
				msg
			}
		}
	}
`

export default graphql(loginMutation)(Login)
