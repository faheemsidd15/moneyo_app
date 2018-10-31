import React from "react"
import { View, Text, AsyncStorage, ScrollView, TouchableHighlight } from "react-native"
import { Button, Card, Tile, Header, Icon, List } from "react-native-elements"
import DefaultHeader from "../components/DefaultHeader"
import { BACKGROUND, LIGHT_GREEN, TERTIARY, QUATERNARY, PRIMARY_COLOR, QUINARY, SECONDARY_COLOR } from "../AppTheme"
import PopupForm from "../components/PopupForm"

class Income extends React.Component {
	constructor() {
		super()
		this.state = {
			incomes: [],
			modalVisible: false
		}
	}

	setModalVisible() {
		this.setState({ modalVisible: true })
	}
	closeModal = () => {
		this.setState({ modalVisible: false })
	}

	render() {
		return (
			<View style={{ height: "100%" }}>
				<DefaultHeader showMenu={true} open={this.props.navigation.openDrawer} title="Income" />
				<PopupForm visible={this.state.modalVisible} close={this.closeModal} />
				<ScrollView style={{ backgroundColor: BACKGROUND }}>
					<Card title="Summary">
						<View>
							<Text>Hello</Text>
							<Text>From Income</Text>
						</View>
					</Card>
				</ScrollView>
				<View
					style={{
						height: 100,
						width: "100%",
						position: "fixed",
						bottom: 0,
						backgroundColor: PRIMARY_COLOR,
						display: "flex",
						justifyContent: "center",
						alignItems: "center"
					}}
				>
					<TouchableHighlight>
						<Icon
							onPress={() => {
								this.setModalVisible()
							}}
							underlayColor={PRIMARY_COLOR}
							type="entypo"
							name="circle-with-plus"
							color="white"
							size={40}
						/>
					</TouchableHighlight>
					<Text style={{ textAlign: "center", color: "white" }}>Add Income</Text>
				</View>
			</View>
		)
	}
}
export default Income
