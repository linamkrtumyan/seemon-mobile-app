import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Arrow = (props) => (
  <Svg
    width={16}
    height={15}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M15 7H3.14l3.63-4.36a1.001 1.001 0 1 0-1.54-1.28l-5 6a1.19 1.19 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 0 8a1 1 0 0 0 .07.36c0 .05 0 .08.07.13.026.052.056.102.09.15l5 6a1 1 0 0 0 1.54-1.28L3.14 9H15a1 1 0 1 0 0-2Z"
      fill="#000"
    />
  </Svg>
);

export default Arrow;
