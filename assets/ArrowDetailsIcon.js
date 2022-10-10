import * as React from "react";
import Svg, { Path } from "react-native-svg";

const ArrowDetailsIcom = (props) => (
  <Svg
    width={5}
    height={10}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M.78.333A.667.667 0 0 1 1.3.58l3.22 4a.667.667 0 0 1 0 .847l-3.333 4A.668.668 0 0 1 .16 8.573L3.14 5 .26 1.427A.667.667 0 0 1 .78.333Z"
      fill="#000"
    />
  </Svg>
);

export default ArrowDetailsIcom;
