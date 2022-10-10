import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";

const FilterIcon = (props) => (
  <Svg
    width={25}
    height={30}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.855 19a3.502 3.502 0 0 1-6.71 0H1.001a1 1 0 1 1 0-2h2.144a3.502 3.502 0 0 1 6.71 0H23a1 1 0 1 1 0 2H9.855Zm4.29 6.5a3.502 3.502 0 0 1 6.71 0h2.144a1 1 0 1 1 0 2h-2.144a3.501 3.501 0 0 1-6.71 0H1a1 1 0 1 1 0-2h13.144Zm0-17a3.502 3.502 0 0 1 6.71 0h2.144a1 1 0 1 1 0 2h-2.144a3.501 3.501 0 0 1-6.71 0H1a1 1 0 1 1 0-2h13.144ZM17.5 11a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm0 17a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm-11-11.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"
      fill="#000"
    />
    {
     props.active ? <Circle cx={18} cy={7} r={7} fill="#F04A38" /> : null

    }
  </Svg>
);

export default FilterIcon;
