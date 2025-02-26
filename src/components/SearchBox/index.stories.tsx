import { Flex } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react';

// Components
import SearchBox from '.';

const meta = {
  title: 'Components/SearchBox',
  component: SearchBox,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  render: (args) => (
    <Flex justifyContent="center" w="1000px" p={9} bgColor="spaceBlue">
      <SearchBox {...args} />
    </Flex>
  ),
} satisfies Meta<typeof SearchBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onChange: (value: string) => console.log(value),
  },
};
