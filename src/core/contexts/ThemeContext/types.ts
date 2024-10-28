export enum IThemeMode {
  LIGHT = "light",
  DARK = "dark",
  SYSTEM = "system",
}

export interface IThemeContext {
  isMobile: boolean;
  themeMode: IThemeMode;
  switchTheme: (mode: IThemeMode) => void;
}
