import * as React from "react"
import Svg, { Path } from "react-native-svg"

const CheckedIcon = (props) => (
  <Svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.222 0C15.2 0 16 .8 16 1.778v12.444C16 15.2 15.2 16 14.222 16H1.778C.8 16 0 15.2 0 14.222V1.778C0 .8.8 0 1.778 0h12.444Zm-.171 2.667-8.03 8.438L2.837 7.76l-1.06 1.115 4.242 4.457 9.091-9.552-1.06-1.114Z"
      fill="#F04A38"
    />
  </Svg>
)

export default CheckedIcon
