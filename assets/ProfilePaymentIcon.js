import * as React from "react"
import Svg, { Path } from "react-native-svg"

const ProfilePaymentIcon = (props) => (
  <Svg
    width={20}
    height={14}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M5 10h4a1 1 0 0 0 0-2H5a1 1 0 0 0 0 2ZM15 10h-2a1 1 0 1 1 0-2h2a1 1 0 1 1 0 2Z"
      fill="#F04A38"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17 0H3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3ZM2 3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v1H2V3Zm16 8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6h16v5Z"
      fill="#F04A38"
    />
  </Svg>
)

export default ProfilePaymentIcon
