import { Theme, createTheme } from "@mui/material";

export const themeLight: Theme = createTheme({
  palette: {
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
});

export const themDark: Theme = createTheme({
  palette: {
    mode: "dark",
    common: {
      black: "#000",
      white: "#000",
    },

    primary: {
      main: "#1976D2",
      contrastText: "#fff",
      dark: "#fff",
      light: "#000",
    },
    secondary: {
      main: "#909090",
    },
    action: {
      active: "#fff",
      hover: "#fff",
      selected: "#909090",
      disabled: "#909090",
      disabledBackground: "#BCBCBC",
    },
    error: {
      main: "#f44336",
    },

    text: {
      primary: "#fff",
      secondary: "#909090",
    },

    background: {
      default: "#212121",
      paper: "#424242",
    },
  },
});
