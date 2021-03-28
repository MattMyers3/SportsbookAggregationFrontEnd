import { createMuiTheme } from "@material-ui/core/styles";
import "@fontsource/open-sans"

interface PaletteColor {
  light?: string;
  main: string;
  dark?: string;
  contrastText?: string;
}

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    tertiary: Palette["primary"];
  }
  interface PaletteOptions {
    tertiary: PaletteOptions["primary"];
  }
}

const mainTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#39b54a",
    },
    secondary: {
      main: "#ffffff",
    },
    tertiary: {
      main: "#f9e609",
    },
  },
  typography: {
    fontFamily: 'Open Sans'
  }
});
export default mainTheme;
