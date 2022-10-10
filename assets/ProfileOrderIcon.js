import * as React from "react"
import Svg, { Path } from "react-native-svg"

const ProfileOrderIcon = (props) => (
  <Svg
    width={19}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.72 4c-.17-.3-.412-.549-.704-.724A1.934 1.934 0 0 0 17.053 3H4.492L3.926.74A1 1 0 0 0 3.56.196.968.968 0 0 0 2.943 0H.981c-.26 0-.51.105-.694.293a1.01 1.01 0 0 0 0 1.414A.972.972 0 0 0 .981 2h1.217l2.708 10.26a1 1 0 0 0 .364.545.969.969 0 0 0 .617.195h8.83a.968.968 0 0 0 .513-.15.994.994 0 0 0 .36-.4l3.219-6.56A2.033 2.033 0 0 0 18.72 4Zm-4.611 7H6.633l-1.6-6h12.02l-2.944 6Z"
      fill="#F04A38"
    />
    <Path
      d="M5.5 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM17 16.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
      fill="#F04A38"
    />
  </Svg>
)

export default ProfileOrderIcon
