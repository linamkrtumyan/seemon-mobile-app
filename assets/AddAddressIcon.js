import * as React from "react";
import Svg, { Path } from "react-native-svg";

const AddAddressIcon = (props) => (
  <Svg
    width={12}
    height={12}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M5 11a1 1 0 1 0 2 0V7h4a1 1 0 1 0 0-2H7V1a1 1 0 0 0-2 0v4H1a1 1 0 0 0 0 2h4v4Z"
      fill="#0B73EE"
    />
  </Svg>
);

export default AddAddressIcon;
