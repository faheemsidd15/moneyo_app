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
		const { value, name, isMoney, width, textColor, isNumber } = this.props
		//console.log("rendering", name)
		const placeholder = null
		return (
			<View style={{ display: "flex", flexDirection: "row" }}>
				{isMoney ? <Icon type="foundation" name="dollar" size={30} color={textColor || "black"} /> : null}
				{"  "}
				<TextInput
					onChangeText={this.onChangeText}
					value={value}
					style={{
						paddingLeft: 5,
						width: width == undefined ? 200 : width,
						fontSize: 20,
						color: textColor || "black"
					}}
					placeholderTextColor="rgba(255,255, 255, 0.5)"
					keyboardType={isNumber ? "numeric" : "default"}
					keyboardAppearance="dark"
					placeholder={name}
				/>
			</View>
		)
	}
}
