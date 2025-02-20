import type { Meta, StoryObj } from '@storybook/react';

// Components
import Pagination from '.';
import { Flex } from '@chakra-ui/react';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  render: () => (
    <Flex justifyContent="center" w="1000px" p={9} bgColor="spaceBlue">
      <Pagination />
    </Flex>
  ),
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    totalRecords: 200,
    pageSize: 10,
    currentPage: 2,
  },
};
