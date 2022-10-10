import * as React from "react";
import Svg, { Path } from "react-native-svg";

const MoreIcon = (props) => (
  <Svg
    width={18}
    height={12}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M.94 0h16.12c.52 0 .94.42.94.94v.12c0 .52-.42.94-.94.94H.94A.94.94 0 0 1 0 1.06V.94C0 .42.42 0 .94 0ZM2 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM4.94 5h12.12c.52 0 .94.42.94.94v.12c0 .52-.42.94-.94.94H4.94A.94.94 0 0 1 4 6.06v-.12c0-.52.42-.94.94-.94ZM17.06 10H.94a.94.94 0 0 0-.94.94v.12c0 .52.42.94.94.94h16.12c.52 0 .94-.42.94-.94v-.12a.94.94 0 0 0-.94-.94Z"
      fill={props.active ? "#F04A38" : "#000"}
    />
  </Svg>
);

export default MoreIcon;
