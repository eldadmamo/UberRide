import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";
import * as React from "react"; // Import React to use React.PropsWithChildren

interface IThemeInterface {
  blueColor: string;
  greyColor: string;
  yellowColor: string;
  greenColor: string;
}

const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  ThemeProvider: StyledThemeProvider,
} = styledComponents as ThemedStyledComponentsModule<IThemeInterface>;

// Cast ThemeProvider to include children prop
const ThemeProvider = StyledThemeProvider as React.ComponentClass<
  React.PropsWithChildren<{ theme: IThemeInterface }>
>;

export { css, injectGlobal, keyframes, ThemeProvider };
export default styled;