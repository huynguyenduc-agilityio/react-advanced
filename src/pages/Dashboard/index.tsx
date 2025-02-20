import { useCallback, useDeferredValue, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react';

// Icons
import { FaPhoneAlt, FaUser } from 'react-icons/fa';
import { HiMapPin, HiMiniPencil } from 'react-icons/hi2';
import { IoBagSharp } from 'react-icons/io5';
import { PiCheckSquareFill } from 'react-icons/pi';
import { RiDeleteBin7Fill } from 'react-icons/ri';

// Themes
import { fonts } from '@/themes/bases/typography';

// Constants
import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_PAGE_SIZE,
  ERROR_MESSAGES,
  PUBLIC_ROUTERS,
  SUCCESS_MESSAGES,
} from '@/constants';

// Types
import { TDataSource } from '@/types';

// Enums
import { Status as StatusEnum, ToastStatus } from '@/enums';

// Mocks
import { MOCK_SUMMARY_DASHBOARD } from '@/__mocks__';

// Hooks
import {
  useCustomToast,
  useDeleteUser,
  useGetUsers,
  usePagination,
} from '@/hooks';

// Contexts
import { useConfirmationDialog } from '@/contexts';

// Components
import { CardSummary, Pagination, SearchBox, Status } from '@/components';
import Table from '@/components/Table';

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_CURRENT_PAGE);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const { confirm } = useConfirmationDialog();
  const [searchParams, setSearchParams] = useSearchParams();
  const deferredQuery = useDeferredValue(searchParams.get('search') || '');

  const { handleDeleteUser, isDeleteLoading } = useDeleteUser();
  const showToast = useCustomToast();

  const { users, isUsersLoading } = useGetUsers({
    page: currentPage,
    pageSize,
    filter: { search: searchParams.get('search') || '' },
  });

  const { handleChangeLimit, handleChangePage, isDisableNext, isDisablePrev } =
    usePagination(
      users?.meta.pagination.pageCount ?? 0,
      currentPage,
      setCurrentPage,
      setPageSize,
    );

  const handleSearch = (value: string) => {
    if (value) {
      searchParams.set('search', value);
      setSearchParams(searchParams);
    } else {
      searchParams.delete('search');
      setSearchParams(searchParams);
    }
  };

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await handleDeleteUser(id);

        showToast({
          status: ToastStatus.Success,
          message: SUCCESS_MESSAGES.DELETE_USER,
        });
      } catch (error) {
        showToast({
          status: ToastStatus.Error,
          message: ERROR_MESSAGES.DELETE_USER,
        });
      }
    },
    [handleDeleteUser, showToast],
  );

  const handleConfirmDelete = useCallback(
    (id: string, name: string) => {
      confirm({
        title: `Delete User`,
        confirmMessage: `Are you sure you want to delete ${name}?`,
        onConfirm: () => handleDelete(id),
      });
    },
    [confirm, handleDelete],
  );

  const renderColumns = useMemo(
    () => [
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
        renderBody: ({ id, email, name }: TDataSource) => {
          const onDelete = () => handleConfirmDelete(id, name as string);

          return (
            <Flex gap={2} align="center">
              <Link to={PUBLIC_ROUTERS.USER_EDIT.replace(':id', id)}>
                <IconButton
                  aria-label="Edit"
                  icon={<HiMiniPencil />}
                  variant="icon"
                />
              </Link>

              <IconButton
                aria-label="delete"
                data-id={id}
                data-email={email}
                icon={<RiDeleteBin7Fill />}
                variant="icon"
                onClick={onDelete}
              />
            </Flex>
          );
        },
      },
    ],
    [handleConfirmDelete],
  );

  return (
    <VStack align="start" gap={0}>
      <Flex justifyContent="space-between" width="full">
        <Flex alignItems="center" gap="50px">
          <Text
            fontFamily={fonts.heading}
            fontSize="xl"
            fontWeight="bold"
            color="white"
          >
            Users
          </Text>

          <SearchBox
            defaultValue={deferredQuery}
            onChange={handleSearch}
            w="352px"
          />
        </Flex>

        <Link to="/users/add-user">
          <Button variant="primary" title="Add User" width="137px">
            Add User
          </Button>
        </Link>
      </Flex>

      <Flex w="full" gap={8} mt="50px" mb="30px">
        {MOCK_SUMMARY_DASHBOARD.map(({ title, total, icon: Icon }) => (
          <CardSummary
            key={title}
            title={title}
            total={total}
            icon={<Icon />}
          />
        ))}
      </Flex>

      <Table
        isLoading={isUsersLoading || isDeleteLoading}
        columns={renderColumns}
        dataSource={users?.items as TDataSource[] | undefined}
      />

      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalRecords={users?.meta?.pagination?.total ?? 0}
        isDisabledPrev={isDisablePrev}
        isDisableNext={isDisableNext}
        onPageChange={handleChangePage}
        onChangeLimit={handleChangeLimit}
      />
    </VStack>
  );
};

export default Dashboard;
