import * as React from "react"
import Svg, { Rect } from "react-native-svg"

const UncheckedIcon = (props) => (
  <Svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect x={0.5} y={0.5} width={15} height={15} rx={1.5} stroke="#F04A38" />
  </Svg>
)

export default UncheckedIcon
