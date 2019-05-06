import React, { Component } from "react"
import { Animated, View, StyleSheet, Image, Dimensions, ScrollView } from "react-native"

const deviceWidth = Dimensions.get("window").width
const FIXED_BAR_WIDTH = 280
const BAR_SPACE = 10

const cards = ["income", "expenses"]

export default class App extends Component {
	numItems = cards.length
	itemWidth = FIXED_BAR_WIDTH / this.numItems - (this.numItems - 1) * BAR_SPACE
	animVal = new Animated.Value(0)

	render() {
		let barArray = []
		cards.forEach((image, i) => {
			const scrollBarVal = this.animVal.interpolate({
				inputRange: [deviceWidth * (i - 1), deviceWidth * (i + 1)],
				outputRange: [-this.itemWidth, this.itemWidth],
				extrapolate: "clamp"
			})

			const thisBar = (
				<View
					key={`bar${i}`}
					style={[
						styles.track,
						{
							width: this.itemWidth,
							marginLeft: i === 0 ? 0 : BAR_SPACE
						}
					]}
				>
					<Animated.View
						style={[
							styles.bar,
							{
								width: this.itemWidth,
								transform: [{ translateX: scrollBarVal }]
							}
						]}
					/>
				</View>
			)
			barArray.push(thisBar)
		})

		return (
			<View style={styles.container} flex={1}>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					scrollEventThrottle={10}
					pagingEnabled
					onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.animVal } } }])}
				>
					<View style={{ width: deviceWidth - 50, backgroundColor: "purple", margin: 5, height: 100 }}>Hello</View>
					<View style={{ width: deviceWidth - 50, backgroundColor: "purple", margin: 5, height: 100 }}>Hello</View>
				</ScrollView>
				<View style={styles.barContainer}>{barArray}</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	barContainer: {
		position: "absolute",
		zIndex: 2,
		top: 400,
		flexDirection: "row"
	},
	track: {
		backgroundColor: "#ccc",
		overflow: "hidden",
		height: 2
	},
	bar: {
		backgroundColor: "#5294d6",
		height: 2,
		position: "absolute",
		left: 0,
		top: 0
	}
})
