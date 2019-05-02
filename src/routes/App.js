import React, { Component } from "react"
import { View, Text, AsyncStorage, SafeAreaView, ScrollView, Dimensions } from "react-native"
import { Button, Card, Tile, Header, Icon, List } from "react-native-elements"
import { createDrawerNavigator, DrawerItems } from "react-navigation"
import { ME } from "../Queries"
import { Query } from "react-apollo"
import { LIGHT_GREEN, PRIMARY_COLOR, SECONDARY_COLOR } from "../AppTheme"

import Settings from "./Settings.js"
import Summary from "./Summary.js"
import Income from "./Income.js"

class App extends Component {
  render() {
    return <AppDrawer />
  }
}

const CustomDrawerComponent = props => (
  <Query query={ME}>
    {({ loading, data }) => {
      if (loading) {
        return null
      }
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ height: 150, backgroundColor: SECONDARY_COLOR }}>
            <Text style={{ color: "white" }}>{data.me.name}</Text>
          </View>
          <ScrollView style={{ backgroundColor: "rgb(51, 56, 81)" }}>
            <DrawerItems {...props} style={{ color: "white" }} />
          </ScrollView>
        </SafeAreaView>
      )
    }}
  </Query>
)

const AppDrawer = createDrawerNavigator(
  {
    Summary: Summary,
    Settings: Settings,
    Income: Income
  },
  {
    contentComponent: CustomDrawerComponent,
    contentOptions: {
      activeTintColor: "white"
    }
  }
)
export default App
