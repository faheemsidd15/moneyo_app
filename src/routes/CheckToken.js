import React from "react"
import { Text, AsyncStorage } from "react-native"
import { graphql } from "react-apollo"
import gql from "graphql-tag"
import { TOKEN_KEY } from "../constants"

class CheckToken extends React.Component {
	componentDidMount = async () => {
		//	await AsyncStorage.setItem(TOKEN_KEY, "")
		const token = await AsyncStorage.getItem(TOKEN_KEY)
		if (!token) {
			this.props.history.push("/signup")
			return
		}
		let response
		try {
			response = await this.props.mutate({})
			console.log(response)
		} catch (err) {
			console.log(err)
			console.log(this.props)
			this.props.history.push("/signup")
			return
		}
		const { refreshToken } = response.data
		await AsyncStorage.setItem(TOKEN_KEY, refreshToken)
		this.props.history.push("/app")
	}
	render() {
		return <Text>loading...</Text>
	}
}

const refreshTokenMutation = gql`
	mutation {
		refreshToken
	}
`

export default graphql(refreshTokenMutation)(CheckToken)
