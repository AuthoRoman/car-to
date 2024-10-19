import CarInWorking from "./CarInWorking";
import { Meta, StoryObj } from "@storybook/react";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";
import Layout from "../Layout/Layout";

import {
  mockedCarsServiceRequests,
  mockedCarsServiceRequestsEmptyData,
} from "../../../.storybook/mockedData/CarsService/requests";

const meta = {
  title: "pages/CarInWorking",
  component: CarInWorking,
  excludeStories: ["ServiceCarSlice"],
  args: {},
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: "CarInWorking",
      },
    },
  },
} satisfies Meta<typeof CarInWorking>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CarInWorkingStory: Story = {
  args: {},
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: "inwork" },
    }),
    msw: {
      handlers: mockedCarsServiceRequests,
    },
  },

  render: () => (
    <Layout>
      <CarInWorking />
    </Layout>
  ),
};

export const CarInWorkingStoryEmpty: Story = {
  args: {},
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: "inwork" },
    }),
    msw: {
      handlers: mockedCarsServiceRequestsEmptyData,
    },
  },

  render: () => (
    <Layout>
      <CarInWorking />
    </Layout>
  ),
};
