import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SearchCrossIcon = (props) => (
  <Svg
    width={10}
    height={10}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="m6.057 5 3.225-3.217A.753.753 0 0 0 8.217.718L5 3.943 1.782.718A.753.753 0 1 0 .717 1.783L3.942 5 .717 8.218a.75.75 0 0 0 .245 1.229.75.75 0 0 0 .82-.164L5 6.058l3.217 3.225a.75.75 0 0 0 1.23-.245.75.75 0 0 0-.165-.82L6.057 5Z"
      fill="#8F8F8F"
    />
  </Svg>
);

export default SearchCrossIcon;
