import React from "react"
import { AsyncStorage } from "react-native"
import ApolloClient, { InMemoryCache } from "apollo-boost"
import { ApolloProvider } from "react-apollo"
import Routes from "./routes"

import { TOKEN_KEY } from "./constants"

/* For local dev, change the IP to localhost */

const client = new ApolloClient({
	uri: "http://10.144.59.49:4000/",
	request: async operation => {
		const token = await AsyncStorage.getItem(TOKEN_KEY)
		operation.setContext({
			headers: {
				authorization: token ? `Bearer ${token}` : ""
			}
		})
	},
	cache: new InMemoryCache()
})

export default () => (
	<ApolloProvider client={client}>
		<Routes />
	</ApolloProvider>
)
