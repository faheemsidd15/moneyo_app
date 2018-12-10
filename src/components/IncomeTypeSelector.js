import React from "react"
import { CheckBox } from "react-native-elements"
import { BACKGROUND, LIGHT_GREEN, TERTIARY, QUATERNARY, PRIMARY_COLOR, QUINARY, SECONDARY_COLOR } from "../AppTheme"

export default class IncomeTypeSelector extends React.PureComponent {
  render() {
    const { checked, type, value, onCheckType } = this.props

    return (
      <CheckBox
        containerStyle={{
          borderRadius: 50,
          width: 150,
          backgroundColor: checked && type === value ? TERTIARY : "rgb(240, 240, 240)"
        }}
        center
        checked={checked && type === value}
        title={value.charAt(0).toUpperCase() + value.substr(1)}
        textStyle={{ color: checked && type === value ? "white" : "black" }}
        onPress={() => onCheckType(value)}
        onIconPress={() => onCheckType(value)}
        uncheckedColor={QUATERNARY}
        checkedColor={QUINARY}
      />
    )
  }
}
