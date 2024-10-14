import React from "react";
import { Provider } from "react-redux";
import { CssBaseline } from "@mui/material";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import type { Decorator, Preview } from "@storybook/react";
import { initialize, mswLoader } from "msw-storybook-addon";
import { ThemeContextProvider } from "../src/core/contexts/ThemeContext/index";
import { setupStore } from "../src/state/slices/index";
import "loki/configure-react";
initialize({
  onUnhandledRequest: "bypass", // Пропускать неперехваченные запросы, чтобы избежать ошибок
});

const store = setupStore();

const withProviders: Decorator = (Story) => (
  <Provider store={store}>
    <ThemeContextProvider>
      <CssBaseline />
      <Story />
    </ThemeContextProvider>
  </Provider>
);

const decoratorsApp = [
  withProviders,

  withThemeFromJSXProvider({
    GlobalStyles: CssBaseline,
  }),
];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  loaders: [mswLoader],
  decorators: decoratorsApp,
};

/* snipped for brevity */

export default preview;
