import React from "react"
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo"
import Routes from "./routes"

/* For local dev, change the IP to localhost */
const client = new ApolloClient({
	uri: "http://192.168.1.151:4000/"
})

export default () => (
	<ApolloProvider client={client}>
		<Routes />
	</ApolloProvider>
)
