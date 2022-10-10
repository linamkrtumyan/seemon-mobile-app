import * as React from "react"
import Svg, { Path } from "react-native-svg"

const InvalidInputIcon = (props) => (
  <Svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M8 0C3.578 0 0 3.578 0 8c0 4.422 3.578 8 8 8 4.422 0 8-3.578 8-8 0-4.422-3.578-8-8-8Zm0 14.75A6.746 6.746 0 0 1 1.25 8c0-3.731 3.02-6.75 6.75-6.75 3.731 0 6.75 3.02 6.75 6.75 0 3.731-3.02 6.75-6.75 6.75Z"
      fill="#B70202"
    />
    <Path
      d="M8 4.027a.625.625 0 0 0-.625.625v4.025a.625.625 0 1 0 1.25 0V4.652A.625.625 0 0 0 8 4.027ZM8 11.755a.844.844 0 1 0 0-1.688.844.844 0 0 0 0 1.688Z"
      fill="#B70202"
    />
  </Svg>
)

export default InvalidInputIcon
