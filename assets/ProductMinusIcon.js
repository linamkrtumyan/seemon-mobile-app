import * as React from "react"
import Svg, { Rect } from "react-native-svg"

const ProductMinusIcon = (props) => (
  <Svg
    width={14}
    height={2}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect width={14} height={2} rx={1} fill="#53B175" />
  </Svg>
)

export default ProductMinusIcon
