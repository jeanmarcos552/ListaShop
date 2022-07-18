import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const Backdrop = props => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" {...props}>
    <Path
      fill="#01ac73"
      d="m0 64 30 10.7C60 85 120 107 180 117.3c60 10.7 120 10.7 180 37.4 60 26.3 120 80.3 180 96 60 16.3 120-5.7 180-37.4 60-32.3 120-74.3 180-80 60-5.3 120 26.7 180 21.4 60-5.7 120-47.7 180-69.4C1320 64 1380 64 1410 64h30v256H0Z"
    />
  </Svg>
);
