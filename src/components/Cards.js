import React from "react"
import { Dimensions, StyleSheet, View, Text } from "react-native"
import { Card, Icon } from "react-native-elements"
import { Query } from "react-apollo"
import SvgComponent from "../components/Lines"

const deviceWidth = Dimensions.get("window").width

/*
        PROPS
color: pass a color imported from AppTheme
destination: pass the ending destination for the navigation
finType: Financial type, ex. "Income" 
title: Title of the Card
query: Pass the query from Queries
*/
const Cards = props => {
  const { color, destination, finType, title, query } = props
  return (
    <Card
      title={title}
      containerStyle={{
        height: 500,
        width: deviceWidth * 0.9,
        backgroundColor: "rgba(0,0,0,0.1)",
        borderColor: "transparent",
        borderRadius: 25,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2
      }}
      titleStyle={{ fontSize: 20, color: color, textAlign: "left" }}
      dividerStyle={{ backgroundColor: color }}
    >
      <Query query={query} notifyOnNetworkStatusChange>
        {({ loading, data }) => {
          //console.log("Card Data", Object.values(data)[0])

          if (loading) {
            return null
          }

          if (Object.values(data)[0] === null) {
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
                  <Icon type="font-awesome" name="plus" color={color} onPress={destination} />
                  {"   "}
									to Add an {finType}
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
                alignItems: "flex-start"
              }}
            >
              <View style={{ paddingBottom: 20 }}>
                <Text style={{ color: "white", fontSize: 40 }}>${Object.values(data)}</Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Icon type="font-awesome" name="plus" color={color} size={45} onPress={destination} />
              </View>
            </View>
          )
        }}
      </Query>

      <SvgComponent
        width="600"
        height="500"
        fill="rgba(255,255,255,0.6)"
        style={{ backgroundColor: "transparent", position: "absolute", left: -20 }}
      />
    </Card>
  )
}

export default Cards
