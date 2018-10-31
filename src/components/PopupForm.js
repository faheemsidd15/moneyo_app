import React, { Component } from "react"
import { Modal, Text, TouchableHighlight, View, Alert } from "react-native"
import { ScrollView } from "react-native-gesture-handler"

class PopupForm extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Modal
				animationType="slide"
				transparent={true}
				visible={this.props.visible}
				onRequestClose={() => {
					Alert.alert("Modal has been closed.")
				}}
			>
				<ScrollView>
					<View style={{ paddingTop: 100, backgroundColor: "red", height: 400 }}>
						<View>
							<Text>Hello World!</Text>

							<TouchableHighlight
								onPress={() => {
									this.props.close()
								}}
							>
								<Text>Hide Modal</Text>
							</TouchableHighlight>
						</View>
					</View>
				</ScrollView>
			</Modal>
		)
	}
}
export default PopupForm
