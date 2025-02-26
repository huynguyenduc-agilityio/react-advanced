import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Avatar, Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Icons
import { FaPhoneAlt, FaUser } from 'react-icons/fa';
import { HiMapPin, HiMiniPencil } from 'react-icons/hi2';
import { IoBagSharp } from 'react-icons/io5';
import { PiCheckSquareFill } from 'react-icons/pi';
import { RiDeleteBin7Fill } from 'react-icons/ri';

// Themes
import { fonts } from '@/themes/bases/typography';

// Types
import { TDataSource, Status as StatusEnum } from '@/types';

// Components
import Status from '@/components/Status';
import Table from '..';

const mockOnClick = jest.fn();
const mockDelete = jest.fn();

jest.mock('@/hooks', () => ({
  ...jest.requireActual('@/hooks'),
  useDeleteMultipleUsers: jest.fn(() => ({
    handleDeleteMultipleUsers: mockDelete,
    isDeleteMultipleLoading: false,
  })),
}));

jest.mock('@/contexts', () => ({
  ...jest.requireActual('@/contexts'),
  useConfirmationDialog: jest.fn(() => ({
    confirm: jest.fn(({ onConfirm }) => onConfirm()),
  })),
}));

describe('Table Component', () => {
  const queryClient = new QueryClient();

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  const dataSource: TDataSource[] = [
    {
      id: '1',
      name: 'John Doe',
      phone: '123-456-7890',
      location: 'New York, NY',
      company: 'ABC Company',
      status: StatusEnum.Online,
    },
    {
      id: '2',
      name: 'Jane Doe',
      phone: '987-654-3210',
      location: 'Los Angeles, CA',
      company: 'XYZ Company',
      status: StatusEnum.Offline,
    },
  ];

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
          dataSource={dataSource}
        />
      </Wrapper>,
    );

  it('should match snapshot', () => {
    const { container } = renderSetup();

    expect(container).toMatchSnapshot();
  });

  it('should render an empty state when no data is provided ', () => {
    const { getByText } = render(
      <Wrapper>
        <Table />
      </Wrapper>,
    );

    expect(getByText('No data found')).toBeInTheDocument();
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
    const { getAllByTestId } = renderSetup();
    const editButtons = getAllByTestId('edit-button');

    await userEvent.click(editButtons[0]);
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('should allow selecting a row', async () => {
    const { getAllByRole } = renderSetup();
    const checkboxes = getAllByRole('checkbox');

    await userEvent.click(checkboxes[1]);

    expect(checkboxes[1]).toBeChecked();
  });

  it('should allow selecting all rows', async () => {
    const { getAllByRole } = renderSetup();
    const checkboxes = getAllByRole('checkbox');

    await userEvent.click(checkboxes[0]);

    checkboxes.forEach((checkbox) => {
      expect(checkbox).toBeChecked();
    });
  });

  it('should call delete action on confirm', async () => {
    const { getByText, getAllByRole } = renderSetup();

    const checkboxes = getAllByRole('checkbox');

    await userEvent.click(checkboxes[1]);
    await userEvent.click(getByText('Mark Delete'));

    expect(mockDelete).toHaveBeenCalled();
  });

  it('should call delete action on confirm', async () => {
    const { getAllByTestId, getByText } = renderSetup();

    const checkboxes = getAllByTestId('row-checkbox');
    await userEvent.click(checkboxes[0]);

    const deleteButton = getByText('Mark Delete');
    expect(deleteButton).toBeInTheDocument();

    await userEvent.click(deleteButton);

    expect(mockDelete).toHaveBeenCalled();
  });
});
