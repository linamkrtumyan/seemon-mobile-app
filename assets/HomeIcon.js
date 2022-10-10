import * as React from "react";
import Svg, { Path } from "react-native-svg";

const HomeIcon = (props) => (
  <Svg
    width={18}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M17.42 8.18 9.71.3a1 1 0 0 0-1.42 0L.58 8.19A2 2 0 0 0 0 9.62V18a2 2 0 0 0 1.89 2h14.22A2 2 0 0 0 18 18V9.62a2.07 2.07 0 0 0-.58-1.44ZM7 18v-6h4v6H7Zm9 0h-3v-7a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v7H2V9.58l7-7.15 7 7.19V18Z"
      fill={props.active ? "#F04A38" : "#000"}
    />
  </Svg>
);

export default HomeIcon;
