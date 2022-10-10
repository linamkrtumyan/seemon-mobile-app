import * as React from "react";
import Svg, { Path } from "react-native-svg";

const FavoritesIcon = (props) => (
  <Svg
    width={22}
    height={17}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M11 17a.998.998 0 0 1-.71-.29L2.52 8.93a5.26 5.26 0 0 1 0-7.4 5.24 5.24 0 0 1 7.4 0L11 2.61l1.08-1.08a5.24 5.24 0 0 1 7.4 0 5.26 5.26 0 0 1 0 7.4l-7.77 7.78A1 1 0 0 1 11 17ZM6.22 2a3.2 3.2 0 0 0-2.28.94 3.24 3.24 0 0 0 0 4.57L11 14.58l7.06-7.07a3.24 3.24 0 0 0 0-4.57 3.32 3.32 0 0 0-4.56 0l-1.79 1.8a1 1 0 0 1-1.42 0L8.5 2.94A3.2 3.2 0 0 0 6.22 2Z"
      fill={props.active ? "#F04A38" : "#000"}
    />
  </Svg>
);

export default FavoritesIcon;
