import React from "react"
import { Header, Icon } from "react-native-elements"
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../AppTheme"

export default class DefaultHeader extends React.PureComponent {
	render() {
		return (
			<Header
				centerComponent={{ text: "Money-O", style: { color: "white", fontSize: 20 } }}
				backgroundColor={PRIMARY_COLOR}
				leftComponent={
					this.props.showMenu === true ? <Icon name="menu" onPress={this.props.open} color="white" /> : null
				}
			/>
		)
	}
}
