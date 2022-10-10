import * as React from "react"
import Svg, { Path } from "react-native-svg"

const FacebookIcon = (props) => (
  <Svg
    width={34}
    height={34}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M34 17.104C34 7.658 26.389 0 17 0S0 7.658 0 17.104C0 25.64 6.217 32.717 14.344 34V22.048h-4.317v-4.944h4.317v-3.768c0-4.287 2.538-6.655 6.42-6.655 1.86 0 3.806.334 3.806.334v4.21h-2.143c-2.112 0-2.77 1.318-2.77 2.67v3.209h4.714l-.754 4.944h-3.96V34C27.782 32.717 34 25.64 34 17.104Z"
      fill="#1877F2"
    />
  </Svg>
)

export default FacebookIcon
