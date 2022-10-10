import * as React from "react"
import Svg, { Path } from "react-native-svg"

const ArrowDownIcon = (props) => (
  <Svg
    width={15}
    height={8}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M15 1.17a.999.999 0 0 1-.37.78l-6 4.83a1 1 0 0 1-1.27 0l-6-5A1.001 1.001 0 1 1 2.64.24L8 4.71 13.36.39a1 1 0 0 1 1.64.78Z"
      fill="#000"
    />
  </Svg>
)

export default ArrowDownIcon
