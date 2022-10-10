import * as React from "react"
import Svg, { Rect } from "react-native-svg"

const ProductPlusIcon = (props) => (
  <Svg
    width={14}
    height={14}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect y={5.833} width={14} height={2.333} rx={1.167} fill="#53B175" />
    <Rect
      x={5.833}
      y={14}
      width={14}
      height={2.333}
      rx={1.167}
      transform="rotate(-90 5.833 14)"
      fill="#53B175"
    />
  </Svg>
)

export default ProductPlusIcon
