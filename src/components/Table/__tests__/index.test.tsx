import { Avatar, Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Components
import Status from '@/components/Status';
import Table from '..';

// Icons
import { FaPhoneAlt, FaUser } from 'react-icons/fa';
import { HiMapPin, HiMiniPencil } from 'react-icons/hi2';
import { IoBagSharp } from 'react-icons/io5';
import { PiCheckSquareFill } from 'react-icons/pi';
import { RiDeleteBin7Fill } from 'react-icons/ri';

// Themes
import { fonts } from '@/themes/bases/typography';

// Types
import { TDataSource } from '@/types';

// Enums
import { Status as StatusEnum } from '@/enums';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

const mockOnClick = jest.fn();

describe('Table Component', () => {
  const queryClient = new QueryClient();

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  const renderSetup = () =>
    render(
      <Wrapper>
        <Table
          columns={[
            {
              title: 'Name',
              key: 'name',
              icon: FaUser,
              renderBody: ({ name, avatar, email }: TDataSource) => (
                <Flex
                  p={0}
                  gap={1}
                  border="none"
                  fontSize="xs"
                  alignItems="center"
                >
                  <Avatar
                    size="sm"
                    name={name as string}
                    src={avatar as string}
                  />
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
              renderBody: ({ status }) => (
                <Status type={status as StatusEnum} />
              ),
            },
            {
              key: 'action',
              renderBody: () => (
                <Flex gap={2}>
                  <IconButton
                    aria-label="Edit"
                    icon={<HiMiniPencil />}
                    variant="icon"
                    data-testid="edit-button"
                    onClick={mockOnClick}
                  />
                  <IconButton
                    aria-label="Delete"
                    icon={<RiDeleteBin7Fill />}
                    variant="icon"
                  />
                </Flex>
              ),
            },
          ]}
          dataSource={[
            {
              id: '1',
              name: 'John Doe',
              email: 'john@example.com',
              phone: '123-456-7890',
              location: 'New York, NY',
              company: 'ABC Company',
              status: 'online',
            },
          ]}
        />
      </Wrapper>,
    );

  it('should render correctly', () => {
    const { container } = renderSetup();
    expect(container).toMatchSnapshot();
  });

  it('should render no data correctly', () => {
    const { getByText } = render(
      <Wrapper>
        <Table columns={[]} dataSource={[]} />
      </Wrapper>,
    );
    expect(getByText('No data found')).toBeInTheDocument();
  });

  it('onClick edit button should be called', async () => {
    const { getByTestId } = renderSetup();
    await userEvent.click(getByTestId('edit-button'));
    expect(mockOnClick).toHaveBeenCalled();
  });
});
