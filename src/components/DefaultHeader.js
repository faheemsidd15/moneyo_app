import React from "react"
import { Header, Icon } from "react-native-elements"

export default class DefaultHeader extends React.PureComponent {
	render() {
		return (
			<Header
				centerComponent={{ text: "Money-O", style: { color: "white", fontSize: 20 } }}
				backgroundColor="green"
				leftComponent={
					this.props.showMenu === true ? <Icon name="menu" onPress={this.props.open} color="white" /> : null
				}
			/>
		)
	}
}
