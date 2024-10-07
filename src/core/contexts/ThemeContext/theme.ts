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
    background: {
      default: "#212121",
      paper: "#424242",
    },
  },
});
