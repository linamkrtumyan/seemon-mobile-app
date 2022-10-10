import * as React from "react"
import Svg, { Path } from "react-native-svg"

const ProfileNotificationIcon = (props) => (
  <Svg
    width={18}
    height={21}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="m17.529 13.21-1.802-1.81V6.94a6.856 6.856 0 0 0-1.624-4.53A6.869 6.869 0 0 0 9.901.06a6.753 6.753 0 0 0-7.023 3.892 6.734 6.734 0 0 0-.605 2.778v4.67L.471 13.21A1.64 1.64 0 0 0 1.632 16h3.364v.34A3.839 3.839 0 0 0 9 20a3.846 3.846 0 0 0 4.004-3.66V16h3.364a1.643 1.643 0 0 0 1.602-1.952 1.64 1.64 0 0 0-.441-.838Zm-6.527 3.13A1.88 1.88 0 0 1 9 18a1.883 1.883 0 0 1-2.002-1.66V16h4.004v.34ZM2.503 14l1.182-1.18a2 2 0 0 0 .59-1.42V6.73a4.726 4.726 0 0 1 1.622-3.56A4.676 4.676 0 0 1 9.64 2a4.866 4.866 0 0 1 4.084 4.9v4.5a2 2 0 0 0 .58 1.42L15.497 14H2.503Z"
      fill="#F04A38"
    />
  </Svg>
)

export default ProfileNotificationIcon
