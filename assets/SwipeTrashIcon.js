import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SwipeTrashIcon = (props) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M21 6h-5V4.33A2.42 2.42 0 0 0 13.5 2h-3A2.42 2.42 0 0 0 8 4.33V6H3a1 1 0 0 0 0 2h1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8h1a1 1 0 1 0 0-2ZM10 4.33c0-.16.21-.33.5-.33h3c.29 0 .5.17.5.33V6h-4V4.33ZM18 19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V8h12v11Z"
      fill="#fff"
    />
    <Path
      d="M9 17a1 1 0 0 0 1-1v-4a1 1 0 1 0-2 0v4a1 1 0 0 0 1 1ZM15 17a1 1 0 0 0 1-1v-4a1 1 0 0 0-2 0v4a1 1 0 0 0 1 1Z"
      fill="#fff"
    />
  </Svg>
)

export default SwipeTrashIcon