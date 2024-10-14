import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "storybook-addon-remix-react-router",
    "@storybook/addon-styling",
    "storybook-msw-addon",
    "loki/configure-react",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
};
export default config;
