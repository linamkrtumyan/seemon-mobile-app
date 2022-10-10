import * as React from "react";
import Svg, { Path } from "react-native-svg";

const CategoryIcon = (props) => (
  <Svg
    width={22}
    height={15}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M13.018 9.091c2.055 0 3.72-1.628 3.72-3.636 0-2.009-1.665-3.637-3.72-3.637-2.054 0-3.72 1.628-3.72 3.637 0 2.008 1.666 3.636 3.72 3.636Zm4.348-.217 4.362 4.264a.891.891 0 0 1-.002 1.284.944.944 0 0 1-1.313.002l-4.44-4.341a5.648 5.648 0 0 1-2.954.826c-3.082 0-5.58-2.442-5.58-5.454C7.44 2.442 9.937 0 13.02 0c3.081 0 5.58 2.442 5.58 5.455a5.356 5.356 0 0 1-1.233 3.419ZM0 3.182c0-.502.316-.91.695-.91h4.189c.384 0 .695.404.695.91 0 .502-.316.909-.695.909H.695C.311 4.09 0 3.687 0 3.18Zm0 5.454c0-.502.316-.909.695-.909h4.189c.384 0 .695.404.695.91 0 .502-.316.908-.695.908H.695C.311 9.545 0 9.142 0 8.636Zm0 5.455c0-.502.306-.91.697-.91H13.95c.384 0 .696.404.696.91 0 .502-.306.909-.696.909H.697C.312 15 0 14.597 0 14.091Z"
      fill={props.active ? "#F04A38" : "#000"}
    />
  </Svg>
);

export default CategoryIcon;