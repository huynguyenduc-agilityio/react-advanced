import { Flex } from '@chakra-ui/react';
import { StoryObj, Meta } from '@storybook/react';

import TextareaField from '.';
import { HiMiniPencil } from 'react-icons/hi2';

const defaultProps = {
  label: 'Description',
  name: 'description',
  placeholder: 'Write a short bio about you...',
  icon: HiMiniPencil,
  onChange: () => {},
};

const meta = {
  title: 'Components/TextareaField',
  component: TextareaField,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  render: (args) => (
    <Flex justifyContent="center" w="1000px" p={9} bgColor="spaceBlue">
      <TextareaField {...args} />
    </Flex>
  ),
} satisfies Meta<typeof TextareaField>;

export default meta;

type Story = StoryObj<typeof TextareaField>;

export const Default: Story = {
  args: {
    ...defaultProps,
  },
};

export const WithError: Story = {
  args: {
    ...defaultProps,
    isError: true,
  },
};
