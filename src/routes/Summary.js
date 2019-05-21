import React from "react"
import { Card, Icon } from "react-native-elements"
import { View, Text, ScrollView, Animated, Dimensions, StyleSheet } from "react-native"
import { TOTAL_MONTHLY_INCOME } from "../Queries"
import { graphql } from "react-apollo"
import { TERTIARY, LIGHT_GREEN, CARD_BACKGROUND, BACKGROUND, QUATERNARY, QUINARY, SECONDARY_COLOR } from "../AppTheme"
import DefaultHeader from "../components/DefaultHeader"
import Cards from "../components/Cards"
import { LinearGradient } from "expo"

const deviceWidth = Dimensions.get("window").width
const deviceHeight = Dimensions.get("window").height
const FIXED_BAR_WIDTH = 300
const BAR_SPACE = 10

const cards = ["income", "expenses"]

class Summary extends React.Component {
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

		const { navigation, data } = this.props

		if (navigation.state.routeName === "Summary") {
			data.refetch(TOTAL_MONTHLY_INCOME)
		}

		return (
			<View style={{ height: "100%" }}>
				<DefaultHeader showMenu={true} open={this.props.navigation.openDrawer} title="MoneyO" />

				<LinearGradient colors={[BACKGROUND, TERTIARY]} style={{ height: deviceHeight, width: deviceWidth }}>
					<View style={styles.summaryTextContainer}>
						<Text style={styles.summaryText}>Summary</Text>
					</View>

					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						scrollEventThrottle={10}
						pagingEnabled
						onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.animVal } } }])}
					>
						<Cards
							color={LIGHT_GREEN}
							query={TOTAL_MONTHLY_INCOME}
							destinaiton="Income"
							finType="Income"
							title="Monthly Income"
							destination={() => this.props.navigation.navigate("Income")}
						/>
						<Card
							title="Monthly Expenses"
							containerStyle={{
								height: 500,
								width: 300,
								backgroundColor: CARD_BACKGROUND,
								borderColor: "transparent",
								borderRadius: 10,
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
					<View style={styles.barContainer}>{barArray}</View>
				</LinearGradient>
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
	summaryTextContainer: {
		width: "100%",
		height: 100,
		paddingTop: 10,
		paddingLeft: deviceWidth * 0.05
	},
	summaryText: {
		color: "rgba(255,255,255, 0.4)",
		fontSize: 30,
		fontWeight: "700"
	},
	barContainer: {
		position: "absolute",
		zIndex: 2,
		bottom: 150,
		left: 50,
		flexDirection: "row"
	},
	track: {
		backgroundColor: "white",
		overflow: "hidden",
		height: 2
	},
	bar: {
		backgroundColor: BACKGROUND,
		height: 2,
		position: "absolute",
		left: 0,
		top: 0
	}
})

export default graphql(TOTAL_MONTHLY_INCOME)(Summary)
