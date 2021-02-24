import { createMuiTheme } from "@material-ui/core/styles";

interface PaletteColor {
  light?: string;
  main: string;
  dark?: string;
  contrastText?: string;
}

const mainTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#28a745",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});
export default mainTheme;
