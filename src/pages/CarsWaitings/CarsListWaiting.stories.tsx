import App from "../../App";
import CarsListWaiting from "./CarsListWaiting";
import { Meta, StoryObj } from "@storybook/react";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";
import Layout from "../../core/components/Layout/Layout";
import {
  mockedCarsWaitingRequests,
  mockedCarsWaitingRequestsEmptyData,
} from "../../../.storybook/mockedData/carsWaiting/requests";

const meta = {
  title: "pages/CarsWaitings",
  component: App,
  excludeStories: ["CarsInWaitingsSlice"],
  args: {},
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: "CarsListWaiting",
      },
    },
  },
} satisfies Meta<typeof CarsListWaiting>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CarsListWaitingStory: Story = {
  args: {},
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: "car-to" },
    }),
    msw: {
      handlers: mockedCarsWaitingRequests,
    },
  },

  render: () => (
    <Layout>
      <CarsListWaiting />
    </Layout>
  ),
};

export const CarsListWaitingStoryEmpty: Story = {
  args: {},
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: "car-to" },
    }),
    msw: {
      handlers: mockedCarsWaitingRequestsEmptyData,
    },
  },

  render: () => (
    <Layout>
      <CarsListWaiting />
    </Layout>
  ),
};
