import React from "react"
import { Dimensions, StyleSheet, View, Text } from "react-native"
import { Card, Icon } from "react-native-elements"
import { Query } from "react-apollo"
import SvgComponent from "../components/Lines"

const deviceWidth = Dimensions.get("window").width
const deviceHeight = Dimensions.get("window").height

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
        marginTop: deviceHeight * 0.05,
        height: deviceHeight * 0.7,
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
      titleStyle={{ fontSize: 20, color: color, textAlign: "center" }}
      dividerStyle={{ backgroundColor: color }}
    >
      <Query query={query} notifyOnNetworkStatusChange>
        {({ loading, data }) => {
          //console.log("Card Data", Object.values(data)[0])

          if (loading) {
            return <Text style={{ color: "white" }}>Loading...</Text>
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
                justifyContent: "flex-start",
                alignItems: "flex-start",
                height: "85%"
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%"
                }}
              >
                <Text style={{ color: "white", fontSize: 40 }}>${Object.values(data)}</Text>
              </View>
              <View style={{ position: "absolute", top: "90%", left: "0%" }}>
                <Icon type="font-awesome" name="plus" color={color} size={60} onPress={destination} />
              </View>
            </View>
          )
        }}
      </Query>

      <SvgComponent
        width="1000"
        height="1000"
        fill="rgba(255,255,255,0.3)"
        color={props.color}
        style={{ backgroundColor: "transparent", position: "absolute", left: "-15%", top: -300 }}
      />
    </Card>
  )
}

export default Cards
