import React, { Component } from "react"
import { Container, Content, Card, Text } from "native-base"

export default class Signup extends Component {
	state = {
		values: {},
		errors: {},
		isSubmitting: {}
	}

	render() {
		return (
			<Container>
				<Content>
					<Card>
						<Text>Hello there</Text>
					</Card>
				</Content>
			</Container>
		)
	}
}
