import * as React from "react"
import Svg, { Rect } from "react-native-svg"

const PlusIcon = (props) => (
  <Svg
    width={12}
    height={12}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect y={5} width={12} height={2} rx={1} fill="#53B175" />
    <Rect
      x={5}
      y={12}
      width={12}
      height={2}
      rx={1}
      transform="rotate(-90 5 12)"
      fill="#53B175"
    />
  </Svg>
)

export default PlusIcon
