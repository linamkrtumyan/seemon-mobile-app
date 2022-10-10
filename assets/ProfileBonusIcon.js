import * as React from "react"
import Svg, { Path } from "react-native-svg"

const ProfileBonusIcon = (props) => (
  <Svg
    width={20}
    height={14}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 2.333C0 1.045 1.12 0 2.5 0h15C18.88 0 20 1.045 20 2.333v9.334C20 12.955 18.88 14 17.5 14h-15C1.12 14 0 12.955 0 11.667V2.333Zm1.667 0c0-.43.373-.777.833-.777h15c.46 0 .833.348.833.777v2.334H1.667V2.333Zm16.666 3.89v5.444c0 .43-.373.777-.833.777h-15c-.46 0-.833-.348-.833-.777V6.222h16.666Z"
      fill="#F04A38"
    />
  </Svg>
)

export default ProfileBonusIcon
