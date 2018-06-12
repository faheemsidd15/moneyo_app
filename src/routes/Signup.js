import React, { Component } from "react"
import { View, StyleSheet, KeyboardAvoidingView } from "react-native"
import { Button, Card, Tile, FormInput, Header, Icon } from "react-native-elements"
import image from "../assets/images/photo.png"

const styles = StyleSheet.create({
	field: {
		width: 200,
		fontSize: 20,
		//padding: 10,
		color: "black",
		borderBottomWidth: 1
	},
	flex: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center"
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

						<View style={styles.flex}>
							<FormInput
								onChangeText={text => this.onChangeText("email", text)}
								value={email}
								inputStyle={styles.field}
								placeholder="email"
								placeholderTextColor="white"
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
								onPress={this.submit}
								backgroundColor="transparent"
								color="blue"
							/>
						</View>
					</View>
				</View>
			</KeyboardAvoidingView>
		)
	}
}
