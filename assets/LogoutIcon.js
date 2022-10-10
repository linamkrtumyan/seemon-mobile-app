import * as React from "react"
import Svg, { Path } from "react-native-svg"

const LogoutIcon = (props) => (
  <Svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M6.333 17H2.778A1.778 1.778 0 0 1 1 15.222V2.778A1.778 1.778 0 0 1 2.778 1h3.555M17 9H6.332M12.556 13.444 17 9l-4.444-4.444"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default LogoutIcon
