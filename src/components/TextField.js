import React from "react"
import { StyleSheet } from "react-native"
import { FormInput } from "react-native-elements"

export default class TextField extends React.PureComponent {
	onChangeText = text => {
		const { onChangeText, name } = this.props

		onChangeText(name, text)
	}
	render() {
		const { value, secureTextEntry, name, width, textColor } = this.props
		return (
			<FormInput
				onChangeText={this.onChangeText}
				value={value}
				keyboardAppearance="dark"
				placeholder={name}
				inputStyle={{
					width: width == undefined ? 200 : width,
					fontSize: 20,
					color: textColor || "black"
				}}
				placeholderTextColor="white"
				autoCapitalize="none"
				secureTextEntry={!!secureTextEntry}
			/>
		)
	}
}
