import * as React from "react";
import Svg, { Path } from "react-native-svg";

const StarIcon = (props) => (
  <Svg
    width={10}
    height={10}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M9.974 3.778a.536.536 0 0 0-.457-.38L6.63 3.124 5.49.337A.532.532 0 0 0 5 0a.53.53 0 0 0-.489.337l-1.14 2.787-2.888.274a.538.538 0 0 0-.457.38.571.571 0 0 0 .155.59l2.182 1.997-.643 2.957a.567.567 0 0 0 .207.572.514.514 0 0 0 .584.027L5 8.368l2.489 1.553a.513.513 0 0 0 .584-.027.567.567 0 0 0 .207-.572l-.643-2.957 2.182-1.997a.571.571 0 0 0 .155-.59Z"
      fill="#FB3"
    />
  </Svg>
);

export default StarIcon;
