import React from "react"
import { Header, Icon } from "react-native-elements"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { PRIMARY_COLOR } from "../AppTheme"
import { Text, View, Dimensions } from "react-native"
import { Font } from "expo"

const deviceWidth = Dimensions.get("window").width
const deviceHeight = Dimensions.get("window").height

class Heading extends React.Component {
	constructor() {
		super()
		this.state = {
			fontLoaded: false
		}
	}
	async componentDidMount() {
		await Font.loadAsync({
			"Sofia-Regular": require("../../assets/fonts/Sofia-Regular.ttf")
		})

		this.setState({ fontLoaded: true })
	}

	render() {
		return (
			<View>
				{this.state.fontLoaded ? (
					<Text style={{ color: "white", fontSize: 30, fontFamily: "Sofia-Regular" }}>MoneyO</Text>
				) : null}
			</View>
		)
	}
}

export default class DefaultHeader extends React.PureComponent {
	render() {
		return (
			<Header
				innerContainerStyles={{
					overflow: "hidden",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center"
				}}
				outerContainerStyles={{ height: deviceHeight * 0.13, overflow: "hidden" }}
				centerComponent={<Heading />}
				backgroundColor={PRIMARY_COLOR}
				rightComponent={
					this.props.showMenu === true ? <Icon name="menu" onPress={this.props.open} color="white" size={30} /> : null
				}
				leftComponent={
					this.props.showBackButton === true ? (
						<FontAwesome name="arrow-left" onPress={this.props.back} color="white" size={25} />
					) : null
				}
			/>
		)
	}
}
