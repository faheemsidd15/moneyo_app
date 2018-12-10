import React from "react"
import { StyleSheet, TextInput, View } from "react-native"
import { Icon } from "react-native-elements"

const styles = StyleSheet.create({
	field: {
		paddingLeft: 5,
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
		const { value, name, isMoney } = this.props
		//console.log("rendering", name)
		const placeholder = null
		return (
			<View style={{ display: "flex", flexDirection: "row" }}>
				{isMoney ? <Icon type="foundation" name="dollar" size={30} /> : null}
				{"  "}
				<TextInput
					onChangeText={this.onChangeText}
					value={value}
					style={styles.field}
					placeholderTextColor="white"
					keyboardType="numeric"
					placeholder={name}
				/>
			</View>
		)
	}
}
