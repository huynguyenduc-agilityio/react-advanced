import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StoryObj, Meta } from '@storybook/react';
import { Flex } from '@chakra-ui/react';

// Components
import UploadImage from '.';

const queryClient = new QueryClient();

const meta = {
  title: 'Components/UploadImage',
  component: UploadImage,
  parameters: {
    layout: 'centered',
  },
  render: (arg) => (
    <QueryClientProvider client={queryClient}>
      <Flex justifyContent="center" w="1000px" p={9} bgColor="spaceBlue">
        <UploadImage {...arg} />
      </Flex>
    </QueryClientProvider>
  ),
  tags: ['autodocs'],
} satisfies Meta<typeof UploadImage>;

export default meta;

type Story = StoryObj<typeof UploadImage>;

export const Default: Story = {
  args: {
    onFileChange: () => {},
  },
};

export const HasImage: Story = {
  args: {
    imageUrl: '/path-to-avatar.jpg',
  },
};
