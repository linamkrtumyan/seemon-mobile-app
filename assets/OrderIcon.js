import * as React from "react";
import Svg, { Path } from "react-native-svg";

const OrderIcon = (props) => (
  <Svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M5.47.47.697 5.243a.75.75 0 1 0 1.06 1.06L5.25 2.811V21a.75.75 0 0 0 1.5 0V2.81l3.493 3.493a.75.75 0 1 0 1.06-1.06L6.53.47a.75.75 0 0 0-1.06 0ZM16.53 21.53l4.773-4.773a.75.75 0 0 0-1.06-1.06l-3.493 3.492V1a.75.75 0 0 0-1.5 0v18.19l-3.493-3.493a.75.75 0 0 0-1.06 1.06l4.773 4.773a.75.75 0 0 0 1.06 0Z"
      fill="#000"
    />
  </Svg>
);

export default OrderIcon;
