import React from "react"

import Svg, { G, Path, Circle } from "react-native-svg"

const SvgComponent = props => (
  <Svg viewBox="0 0 841.9 595.3" width={props.width} height={props.height} {...props} className="svg">
    <G fill={props.fill}>
      <Path
        d="M-6.46 272.13L373 651.57L344.57 680L-34.89 300.56L-6.46 272.13Z"
        id="aSBlqv8sD"
        stroke={props.color}
        strokeWidth="25"
        strokeOpacity="0.1"
      />
    </G>
  </Svg>
)

export default SvgComponent
