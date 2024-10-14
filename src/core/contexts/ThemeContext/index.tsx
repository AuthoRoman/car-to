import { createContext, useEffect, useState } from "react";
import { IThemeContext, IThemeMode } from "./types";
import { Theme, ThemeProvider, useMediaQuery } from "@mui/material";
import { themDark, themeLight } from "./theme";

export const ThemeContext = createContext<IThemeContext | null>(null);

export const ThemeContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [themeMode, setThemeMode] = useState<IThemeMode>(IThemeMode.LIGHT);
  const [theme, setTheme] = useState<Theme>(themeLight);

  const SYSTEM_THEME: Exclude<IThemeMode, IThemeMode.SYSTEM> = useMediaQuery(
    "(prefers-color-scheme: dark)",
  )
    ? IThemeMode.DARK
    : IThemeMode.LIGHT;

  useEffect(() => {
    const themeLoaded = _getThemeModefromStorage();
    if (themeLoaded) {
      setThemeMode(themeLoaded);
    }
  }, []);

  useEffect(() => {
    switch (themeMode) {
      case IThemeMode.LIGHT:
        setTheme(themeLight);
        break;
      case IThemeMode.DARK:
        setTheme(themDark);
        break;
      case IThemeMode.SYSTEM:
        switch (SYSTEM_THEME) {
          case IThemeMode.LIGHT:
            setTheme(themeLight);
            break;
          case IThemeMode.DARK:
            setTheme(themDark);
            break;
        }
        break;
      default:
        setTheme(themeLight);
        break;
    }
  }, [themeMode, SYSTEM_THEME]);

  const _setThemeModefromStorage = (mode: IThemeMode) => {
    localStorage.setItem("theme", mode);
  };

  const _getThemeModefromStorage = () => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      return theme as IThemeMode;
    }
    return IThemeMode.LIGHT;
  };

  const switchTheme = (mode: IThemeMode) => {
    setThemeMode(mode);
    _setThemeModefromStorage(mode);
  };

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        switchTheme,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
