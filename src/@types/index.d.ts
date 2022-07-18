import theme from '../styles/themes/light';

declare module '*.png';
declare module '*.jpg';

declare module 'styled-components/native';
import 'styled-components/native';

export type ThemeType = typeof theme;

declare module 'styled-components/native' {
  export interface DefaultTheme extends ThemeType {}
}
