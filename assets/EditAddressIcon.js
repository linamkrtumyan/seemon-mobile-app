import * as React from "react";
import Svg, { Path } from "react-native-svg";


const EditAddressIcon = (props) => (
  <Svg
    width={14}
    height={14}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M13.166 3.117 10.883.833A1.667 1.667 0 0 0 8.666.775l-7.5 7.5c-.269.272-.437.628-.475 1.008l-.358 3.475a.834.834 0 0 0 .833.909h.075l3.475-.317c.381-.038.737-.206 1.009-.475l7.5-7.5a1.6 1.6 0 0 0-.059-2.258Zm-8.6 8.566-2.5.234.225-2.5L7 4.767l2.25 2.25-4.684 4.666ZM10.333 5.9 8.1 3.667 9.725 2 12 4.275 10.333 5.9Z"
      fill="#0B73EE"
    />
  </Svg>
);

export default EditAddressIcon;
