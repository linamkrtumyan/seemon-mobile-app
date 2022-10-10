import * as React from "react"
import Svg, { Path } from "react-native-svg"

const PasswordInputOpenIcon = (props) => (
    <Svg
    width={20}
    height={32}
    fill="none"
    viewBox="0 0 20 25"
    xmlns="http://www.w3.org/2000/svg"
    id="eye"
    {...props}
  >
    <Path
      d="M10 8.708c1.757 0 3.182-1.436 3.182-3.208 0-1.772-1.425-3.208-3.182-3.208S6.818 3.728 6.818 5.5c0 1.772 1.425 3.208 3.182 3.208Z"
      fill="#A5DACF"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20 5.5c0 3.038-4.477 5.5-10 5.5S0 8.538 0 5.5 4.477 0 10 0s10 2.462 10 5.5Zm-1.818 0c0 .533-.418 1.42-1.981 2.28-1.495.822-3.684 1.387-6.201 1.387-2.517 0-4.706-.565-6.2-1.387-1.564-.86-1.982-1.747-1.982-2.28 0-.533.418-1.42 1.982-2.28 1.494-.822 3.683-1.387 6.2-1.387 2.517 0 4.706.565 6.2 1.387 1.564.86 1.982 1.747 1.982 2.28Z"
      fill="#A5DACF"
    />
  </Svg>
)

export default PasswordInputOpenIcon
