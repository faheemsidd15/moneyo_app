import React from "react"
import { Header, Icon } from "react-native-elements"
import { PRIMARY_COLOR } from "../AppTheme"

export default class DefaultHeader extends React.PureComponent {
  render() {
    return (
      <Header
        innerContainerStyles={{ paddingTop: 10 }}
        outerContainerStyles={{ height: 100 }}
        centerComponent={{ text: this.props.title, style: { color: "white", fontSize: 26 } }}
        backgroundColor={PRIMARY_COLOR}
        leftComponent={
          this.props.showMenu === true ? <Icon name="menu" onPress={this.props.open} color="white" /> : null
        }
      />
    )
  }
}
