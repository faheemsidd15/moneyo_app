import React from "react"
import { View, Text, AsyncStorage, ScrollView } from "react-native"
import { Button, Card, Tile, Header, Icon, List } from "react-native-elements"
import TestGraph from "../components/TestGraph"
import { TOTAL_INCOME } from "../Queries"
import { Query } from "react-apollo"
import { TERTIARY, LIGHT_GREEN, CARD_BACKGROUND, BACKGROUND } from "../AppTheme"
import DefaultHeader from "../components/DefaultHeader"
import { LinearGradient } from "expo"

export default class Summary extends React.Component {
  render() {
    return (
      <View style={{ height: "100%" }}>
        <DefaultHeader showMenu={true} open={this.props.navigation.openDrawer} title="Summary" />

        {/* <View
          style={{
            height: 175,
            backgroundColor: CARD_BACKGROUND
          }}
        >
          <TestGraph />
        </View> */}
        <LinearGradient colors={[LIGHT_GREEN, TERTIARY]} style={{ height: "100%" }}>
          <ScrollView>
            <Card
              title="Monthly Income"
              containerStyle={{
                height: 195,
                backgroundColor: CARD_BACKGROUND,
                borderColor: "transparent",
                borderRadius: 25,
                overflow: "hidden"
              }}
              titleStyle={{ fontSize: 20, color: LIGHT_GREEN, textAlign: "center" }}
              dividerStyle={{ backgroundColor: LIGHT_GREEN }}

              //wrapperStyle={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <Query query={TOTAL_INCOME} notifyOnNetworkStatusChange={true}>
                {({ loading, data }) => {
                  if (loading) {
                    return null
                  }
                  if (data.totalIncome === null) {
                    return (
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%"
                        }}
                      >
                        <Text style={{ color: "white", fontSize: 25 }}>
													Press{"   "}
                          <Icon
                            type="font-awesome"
                            name="plus"
                            color={LIGHT_GREEN}
                            onPress={() => this.props.navigation.navigate("Income")}
                          />
                          {"   "}
													to Add an Income
                        </Text>
                      </View>
                    )
                  }

                  return (
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <View style={{ paddingBottom: 20 }}>
                        <Text style={{ color: "white", fontSize: 40 }}>${data.totalIncome}</Text>
                      </View>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <Icon
                          type="font-awesome"
                          name="plus"
                          color={LIGHT_GREEN}
                          size={45}
                          onPress={() => this.props.navigation.navigate("Income")}
                        />
                      </View>
                    </View>
                  )
                }}
              </Query>
            </Card>
            <Card
              title="Monthly Expenses"
              containerStyle={{
                height: 175,
                backgroundColor: CARD_BACKGROUND,
                borderColor: "transparent",
                borderRadius: 25,
                overflow: "hidden"
              }}
              titleStyle={{ fontSize: 20, color: TERTIARY, textAlign: "center" }}
              dividerStyle={{ backgroundColor: TERTIARY }}

              //wrapperStyle={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Icon
                    type="font-awesome"
                    name="plus"
                    color={TERTIARY}
                    style={{ paddingRighteft: 50 }}
                    onPress={() => this.props.navigation.navigate("Income")}
                  />
                  <Text style={{ color: TERTIARY }}>Add Income</Text>
                </View>
                <Text style={{ color: "white", fontSize: 40 }}>$0</Text>
                <View />
              </View>
            </Card>
          </ScrollView>
        </LinearGradient>
      </View>
    )
  }
}
