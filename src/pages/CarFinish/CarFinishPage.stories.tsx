import CarFinishPage from "./CarFinishPage";
import { Meta, StoryObj } from "@storybook/react";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";
import Layout from "../../core/components/Layout/Layout";
import {
  mockedCarsFinishRequests,
  mockedCarsFinishRequestsEmptyData,
} from "../../../.storybook/mockedData/CarsFinish/requests";

const meta = {
  title: "pages/CarFinish",
  component: CarFinishPage,
  excludeStories: ["FinishCarSlice"],
  args: {},
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: "CarFinishPage",
      },
    },
  },
} satisfies Meta<typeof CarFinishPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CarFinishStory: Story = {
  args: {},
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: "finish" },
    }),
    msw: {
      handlers: mockedCarsFinishRequests,
    },
  },

  render: () => (
    <Layout>
      <CarFinishPage />
    </Layout>
  ),
};

export const CarFinishStoryEmpty: Story = {
  args: {},
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: "finish" },
    }),
    msw: {
      handlers: mockedCarsFinishRequestsEmptyData,
    },
  },

  render: () => (
    <Layout>
      <CarFinishPage />
    </Layout>
  ),
};
