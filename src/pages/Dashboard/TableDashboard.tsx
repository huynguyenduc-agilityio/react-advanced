import { useCallback, useDeferredValue, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Box, Flex, IconButton, Text } from '@chakra-ui/react';

// Icons
import { FaPhoneAlt, FaUser } from 'react-icons/fa';
import { HiMapPin, HiMiniPencil } from 'react-icons/hi2';
import { IoBagSharp } from 'react-icons/io5';
import { PiCheckSquareFill } from 'react-icons/pi';

// Themes
import { fonts } from '@/themes/bases/typography';

// Constants
import { DEFAULT_PAGE_SIZE, PUBLIC_ROUTERS } from '@/constants';

// Types
import { Status as StatusEnum, TDataSource } from '@/types';

// Hooks
import { useDeleteUser, useGetUsers, usePagination } from '@/hooks';

// Types
import { ToastStatus } from '@/types';

// Constants
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants';

// Hooks
import { useCustomToast } from '@/hooks';

// Contexts
import { useConfirmationDialog } from '@/contexts';
import { RiDeleteBin7Fill } from 'react-icons/ri';

// Stores
import { useUserFilterStore } from '@/stores';

// Components
import { Pagination, Status } from '@/components';
import Table from '@/components/Table';

const TableDashboard = ({
  currentPage,
  onSetPage,
}: {
  currentPage: number;
  onSetPage: (page: number) => void;
}) => {
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const { handleDeleteUser } = useDeleteUser();

  const { search } = useUserFilterStore();
  const deferredQuery = useDeferredValue(search);
  const showToast = useCustomToast();
  const { confirm } = useConfirmationDialog();

  const { users, isUsersLoading } = useGetUsers({
    page: currentPage,
    pageSize,
    filter: { search: deferredQuery },
  });

  const { handleChangeLimit, handleChangePage, isDisableNext, isDisablePrev } =
    usePagination(
      users?.meta.pagination.pageCount ?? 0,
      currentPage,
      onSetPage,
      setPageSize,
    );

  const handleDelete = useCallback(async (id: string) => {
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
  }, []);

  const handleConfirmDelete = useCallback((id: string, name: string) => {
    confirm({
      title: `Delete User`,
      confirmMessage: `Are you sure you want to delete ${name}?`,
      onConfirm: () => handleDelete(id),
    });
  }, []);

  const renderColumns = useMemo(
    () => [
      {
        title: 'Name',
        key: 'name',
        icon: FaUser,
        isSort: true,
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
        isSort: true,
      },
      {
        title: 'Location',
        key: 'location',
        icon: HiMapPin,
        isSort: true,
      },
      {
        title: 'Company',
        key: 'company',
        icon: IoBagSharp,
        isSort: true,
      },
      {
        title: 'Status',
        key: 'status',
        icon: PiCheckSquareFill,
        isSort: true,
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
    [],
  );
  return (
    <>
      <Table
        isLoading={isUsersLoading}
        columns={renderColumns}
        dataSource={users?.items as TDataSource[] | undefined}
      />
      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalRecords={users?.meta?.pagination?.total}
        isDisabledPrev={isDisablePrev}
        isDisableNext={isDisableNext}
        onPageChange={handleChangePage}
        onChangeLimit={handleChangeLimit}
      />
    </>
  );
};

export default TableDashboard;
