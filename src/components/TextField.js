import React from "react"
import { StyleSheet } from "react-native"
import { FormInput } from "react-native-elements"

const styles = StyleSheet.create({
	field: {
		width: 200,
		fontSize: 20,
		color: "black",
		borderBottomWidth: 1
	}
})

export default class TextField extends React.PureComponent {
	onChangeText = text => {
		const { onChangeText, name } = this.props

		onChangeText(name, text)
	}
	render() {
		const { value, secureTextEntry, name } = this.props
		//console.log("rendering", name)
		return (
			<FormInput
				onChangeText={this.onChangeText}
				value={value}
				placeholder={name}
				inputStyle={styles.field}
				placeholderTextColor="white"
				autoCapitalize="none"
				secureTextEntry={!!secureTextEntry}
			/>
		)
	}
}
