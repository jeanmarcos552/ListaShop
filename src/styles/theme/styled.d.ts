import 'styled-components';

import light from './light';

declare module 'styled-components' {
  type MyTheme = typeof light;

  export interface DefaultTheme extends MyTheme {}
}
