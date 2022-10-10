import * as React from "react"
import Svg, { Path } from "react-native-svg"

const RemoveProductIcon = (props) => (
  <Svg
    width={12}
    height={12}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="m7.175 6 3.583-3.575a.837.837 0 0 0-1.183-1.183L6 4.825 2.425 1.242a.837.837 0 1 0-1.183 1.183L4.825 6 1.242 9.575a.833.833 0 0 0 0 1.183.833.833 0 0 0 1.183 0L6 7.175l3.575 3.583a.833.833 0 0 0 1.183 0 .832.832 0 0 0 0-1.183L7.175 6Z"
      fill="#B70202"
    />
  </Svg>
)

export default RemoveProductIcon
