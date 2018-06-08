import React from "react"
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo"
import Routes from "./routes"

const client = new ApolloClient({
	uri: "https://localhost:4000"
})

export default () => (
	<ApolloProvider client={client}>
		<Routes />
	</ApolloProvider>
)
