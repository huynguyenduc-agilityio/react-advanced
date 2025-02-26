import { Flex } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import TextField from '.';
import { FaUser } from 'react-icons/fa';

const defaultProps = {
  label: 'Full name',
  placeholder: 'Please enter name',
  isError: false,
  errorMessages: '',
  isRequired: false,
  icon: FaUser,
  onChange: () => {},
};

const meta = {
  title: 'Components/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  render: (args) => (
    <Flex justifyContent="center" w="1000px" p={9} bgColor="spaceBlue">
      <TextField {...args} />
    </Flex>
  ),
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: { ...defaultProps },
};

export const WithError: Story = {
  args: {
    ...defaultProps,
    isError: true,
    errorMessages: 'This field is required',
  },
};

export const WithoutIcon: Story = {
  args: {
    ...defaultProps,
    icon: undefined,
  },
};

export const RequiredField: Story = {
  args: {
    ...defaultProps,
    isRequired: true,
  },
};
