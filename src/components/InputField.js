import React from "react"
import { TextInput, View } from "react-native"
import { Icon } from "react-native-elements"
import { BACKGROUND, LIGHT_GREEN, TERTIARY, QUATERNARY, PRIMARY_COLOR, QUINARY, SECONDARY_COLOR } from "../AppTheme"

export default class TextField extends React.PureComponent {
	onChangeText = text => {
		const { onChangeText, name } = this.props

		onChangeText(name, text)
	}
	render() {
		const { value, name, isMoney, width } = this.props
		//console.log("rendering", name)
		const placeholder = null
		return (
			<View style={{ display: "flex", flexDirection: "row" }}>
				{isMoney ? <Icon type="foundation" name="dollar" size={30} color={"white"} /> : null}
				{"  "}
				<TextInput
					onChangeText={this.onChangeText}
					value={value}
					style={{
						paddingLeft: 5,
						width: width == undefined ? 200 : width,
						fontSize: 20,
						color: "black",
						borderBottomWidth: 1
					}}
					placeholderTextColor="white"
					keyboardType="numeric"
					placeholder={name}
				/>
			</View>
		)
	}
}
