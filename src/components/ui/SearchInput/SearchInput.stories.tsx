import { Meta, StoryObj } from "@storybook/react/*";
import SearchInput from "./SearchInput";

const meta: Meta<typeof SearchInput> = {
  title: "UI/SearchInput",
  component: SearchInput,
  parameters: {
    layout: "centered",
  },
};
export default meta;

type Story = StoryObj<typeof SearchInput>;

export const SearchInputComp: Story = {
  args: {},
  render: () => {
    return (
      <SearchInput onChange={() => {}} textLabel="Введите имя для поиска" />
    );
  },
};
