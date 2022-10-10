import * as React from "react"
import Svg, { Path } from "react-native-svg"

const ProfileNavigationArrowIcon = (props) => (
  <Svg
    width={8}
    height={15}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M1.17 0a1 1 0 0 1 .78.37l4.83 6a1 1 0 0 1 0 1.27l-5 6a1.001 1.001 0 0 1-1.54-1.28L4.71 7 .39 1.64A1 1 0 0 1 1.17 0Z"
      fill="#000"
    />
  </Svg>
)

export default ProfileNavigationArrowIcon
