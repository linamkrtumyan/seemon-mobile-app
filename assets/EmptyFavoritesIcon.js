import * as React from "react"
import Svg, { Path } from "react-native-svg"

const EmptyFavoritesIcon = (props) => (
  <Svg
    width={84}
    height={72}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M42 71.5a4.165 4.165 0 0 1-2.959-1.208L6.667 37.875a21.917 21.917 0 0 1 0-30.833 21.833 21.833 0 0 1 30.833 0l4.5 4.5 4.5-4.5a21.833 21.833 0 0 1 30.833 0 21.917 21.917 0 0 1 0 30.833L44.958 70.292A4.167 4.167 0 0 1 42 71.5Z"
      fill="#F04A38"
    />
  </Svg>
)

export default EmptyFavoritesIcon
