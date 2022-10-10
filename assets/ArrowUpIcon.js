import * as React from "react"
import Svg, { Path } from "react-native-svg"

const ArrowUpIcon = (props) => (
  <Svg
    width={15}
    height={8}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M0 6.83a1 1 0 0 1 .37-.78l6-4.83a1 1 0 0 1 1.27 0l6 5a1.001 1.001 0 0 1-1.28 1.54L7 3.29 1.64 7.61A1 1 0 0 1 0 6.83Z"
      fill="#000"
    />
  </Svg>
)

export default ArrowUpIcon
