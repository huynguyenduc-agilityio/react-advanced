import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from '@chakra-ui/react';

// Components
import PersonalForm from '.';

const queryClient = new QueryClient();

const meta = {
  title: 'Components/PersonalForm',
  component: PersonalForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: () => (
    <QueryClientProvider client={queryClient}>
      <Flex justifyContent="center" w="1000px" p={9} bgColor="spaceBlue">
        <PersonalForm />
      </Flex>
    </QueryClientProvider>
  ),
} satisfies Meta<typeof PersonalForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
