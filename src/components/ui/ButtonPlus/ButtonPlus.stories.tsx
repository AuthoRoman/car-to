import { Meta, StoryObj } from "@storybook/react/*";
import ButtonPlus from "./ButtonPlus";

const meta: Meta<typeof ButtonPlus> = {
  title: "UI/ButtonPlus",
  component: ButtonPlus,
  parameters: {
    layout: "centered",
  },
};
export default meta;

type Story = StoryObj<typeof ButtonPlus>;

export const ButtonPlusStoryWithoutCar: Story = {
  args: {},
  render: () => {
    return (
      <ButtonPlus
        onClick={() => {}}
        height="var(--buttonplus-height-withoutcar)"
      />
    );
  },
};

export const ButtonPlusStoryWithCars: Story = {
  args: {},
  render: () => {
    return <ButtonPlus onClick={() => {}} />;
  },
};

export const ButtonPlusStoryWithCarsDisabled: Story = {
  args: {},
  render: () => {
    return <ButtonPlus disabled onClick={() => {}} />;
  },
};
