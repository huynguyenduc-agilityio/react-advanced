import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, Box, Flex, IconButton, Text } from '@chakra-ui/react';

// Icons
import { FaPhoneAlt, FaUser } from 'react-icons/fa';
import { HiMapPin, HiMiniPencil } from 'react-icons/hi2';
import { IoBagSharp } from 'react-icons/io5';
import { PiCheckSquareFill } from 'react-icons/pi';
import { RiDeleteBin7Fill } from 'react-icons/ri';

// Components
import { Status } from '@/components';
import Table from '.';

// Enums
import { Status as StatusEnum } from '@/enums';

// Types
import { TDataSource } from '@/types';

// Themes
import { fonts } from '@/themes/bases/typography';

const queryClient = new QueryClient();

const meta = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (args) => (
    <QueryClientProvider client={queryClient}>
      <Box w="100%" h="screen">
        <Table {...args} />
      </Box>
    </QueryClientProvider>
  ),
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns: [
      {
        title: 'Name',
        key: 'name',
        icon: FaUser,
        renderBody: ({ name, avatar, email }: TDataSource) => (
          <Flex p={0} gap={1} border="none" fontSize="xs" alignItems="center">
            <Avatar size="sm" name={name as string} src={avatar as string} />
            <Box>
              <Text
                fontSize="xs"
                fontWeight="medium"
                fontFamily={fonts.heading}
                color="white"
              >
                {name}
              </Text>
              <Text fontSize="xs" fontWeight="medium" color="pastelBlue">
                {email}
              </Text>
            </Box>
          </Flex>
        ),
      },
      {
        title: 'Phone',
        key: 'phone',
        icon: FaPhoneAlt,
      },
      {
        title: 'Location',
        key: 'location',
        icon: HiMapPin,
      },
      {
        title: 'Company',
        key: 'company',
        icon: IoBagSharp,
      },
      {
        title: 'Status',
        key: 'status',
        icon: PiCheckSquareFill,
        renderBody: ({ status }) => <Status type={status as StatusEnum} />,
      },
      {
        key: 'action',
        renderBody: () => (
          <Flex gap={2}>
            <IconButton
              aria-label="Edit"
              icon={<HiMiniPencil />}
              variant="icon"
            />
            <IconButton
              aria-label="delete"
              icon={<RiDeleteBin7Fill />}
              variant="icon"
            />
          </Flex>
        ),
      },
    ],
    dataSource: [
      {
        id: '1',
        avatar: 'https://bit.ly/dan-abramov',
        name: 'John Caster',
        email: 'john@google.com',
        phone: '(414) 907 - 1274',
        location: 'United States',
        company: 'Google',
        status: 'online',
      },
      {
        id: '2',
        avatar: 'https://bit.ly/dan-abramov',
        name: 'John Caster 2',
        email: 'john@google.com',
        phone: '(414) 907 - 1274',
        location: 'United States',
        company: 'Google',
        status: 'offline',
      },
      {
        id: '3',
        avatar: 'https://bit.ly/dan-abramov',
        name: 'John Caster 3',
        email: 'john@google.com',
        phone: '(414) 907 - 1274',
        location: 'United States',
        company: 'Google',
        status: 'online',
      },
    ],
  },
};
