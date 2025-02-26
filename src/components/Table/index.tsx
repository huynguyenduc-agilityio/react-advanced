import {
  Button,
  Flex,
  Table as TableChakra,
  TableContainer,
  TableProps,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { memo, useCallback, useMemo, useState } from 'react';

// Types
import { TDataSource, THeaderTable, ToastStatus } from '@/types';

// Constants
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants';

// Utils
import { processTableData } from '@/utils';

// Hooks
import { useCustomToast, useDeleteMultipleUsers } from '@/hooks';

// Contexts
import { useConfirmationDialog } from '@/contexts';

// Components
import Fallback from '@/components/Fallback';
import TableHeader from '@/components/Table/TableHeader';
import TableRow from '@/components/Table/TableRow';

type TTableProps = TableProps & {
  title?: string;
  isLoading?: boolean;
  columns?: THeaderTable[];
  dataSource?: TDataSource[];
};

const Table = ({
  title = 'All Users',
  isLoading,
  columns = [],
  dataSource = [],
  ...props
}: TTableProps) => {
  const processedData = useMemo(
    () => processTableData(columns, dataSource),
    [columns, dataSource],
  );
  const showToast = useCustomToast();
  const { confirm } = useConfirmationDialog();
  const { handleDeleteMultipleUsers, isDeleteMultipleLoading } =
    useDeleteMultipleUsers();

  // State to track selected checkboxes
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [isAllSelected, setIsAllSelected] = useState(false);

  // Handle single row selection
  const handleRowSelect = useCallback(
    (rowId: string) => {
      const updatedSelectedRows = new Set(selectedRows);

      if (updatedSelectedRows.has(rowId)) {
        updatedSelectedRows.delete(rowId);
      } else {
        updatedSelectedRows.add(rowId);
      }

      setSelectedRows(updatedSelectedRows);
      setIsAllSelected(updatedSelectedRows.size === processedData.length);
    },
    [processedData.length, selectedRows],
  );

  // Handle "Select All" checkbox
  const handleSelectAll = useCallback(
    (selected: boolean) => {
      if (selected) {
        const allRowIds = processedData.map((data) => data.id);
        setSelectedRows(new Set(allRowIds));
      } else {
        setSelectedRows(new Set());
      }
      setIsAllSelected(selected);
    },
    [processedData],
  );

  const handleBulkDelete = useCallback(async () => {
    try {
      await handleDeleteMultipleUsers(Array.from(selectedRows));

      setSelectedRows(new Set());
      setIsAllSelected(false);

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
  }, [selectedRows, handleDeleteMultipleUsers, showToast]);

  const handleConfirmBulkDelete = useCallback(() => {
    confirm({
      title: 'Delete Users',
      confirmMessage: 'Are you sure you want to delete users?',
      onConfirm: handleBulkDelete,
    });
  }, [confirm, handleBulkDelete]);

  // Determine if the "Select All" checkbox is in indeterminate state
  const isIndeterminate =
    selectedRows.size > 0 && selectedRows.size < processedData.length;

  return (
    <TableContainer
      w="full"
      h="full"
      borderRadius="12px"
      border="0.6px solid"
      borderColor="slateBlue"
      overflowY="scroll"
      css={{
        '&::-webkit-scrollbar': {
          width: 2,
        },
        '&::-webkit-scrollbar-track': {
          width: 2,
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'gray',
          borderRadius: '24px',
        },
      }}
    >
      {isDeleteMultipleLoading && (
        <Flex
          position="absolute"
          inset={0}
          bg="rgba(0, 0, 0, 0.6)"
          alignItems="center"
          justifyContent="center"
          zIndex={10}
        >
          <Fallback />
        </Flex>
      )}

      <Flex
        alignItems="center"
        justifyContent="space-between"
        w="full"
        px={9}
        py={6}
        bg="midNightBlue"
        borderBottom="0.6px solid"
        borderColor="slateBlue"
      >
        <Text as="header" fontFamily="WorkSans-Medium" color="white">
          {title}
        </Text>
        {selectedRows.size !== 0 && (
          <Button onClick={handleConfirmBulkDelete}>Mark Delete</Button>
        )}
      </Flex>

      <TableChakra variant="striped" {...props}>
        <Thead>
          <TableHeader
            columns={columns}
            onSelectAll={handleSelectAll}
            isAllSelected={isAllSelected}
            isIndeterminate={isIndeterminate}
          />
        </Thead>

        <Tbody>
          {processedData.map((data) => (
            <TableRow
              key={data.id}
              id={data.id}
              cells={data.cells}
              isSelected={selectedRows.has(data.id)}
              onSelect={handleRowSelect}
            />
          ))}

          {!processedData.length && !isLoading && (
            <Tr>
              <Td
                colSpan={columns?.length + 1} // Add +1 for the checkbox column
                textAlign="center"
                fontWeight="semibold"
                border="none"
                fontSize="md"
              >
                {ERROR_MESSAGES.EMPTY_DATA}
              </Td>
            </Tr>
          )}

          {!!processedData.length && isLoading && (
            <Tr position="absolute" top="50%" left="50%">
              <Td
                colSpan={columns?.length + 1}
                width="full"
                textAlign="center"
                fontWeight="semibold"
                border="none"
                fontSize="md"
              >
                <Fallback />
              </Td>
            </Tr>
          )}

          {!processedData.length && isLoading && (
            <Tr>
              <Td
                colSpan={columns?.length + 1}
                width="full"
                textAlign="center"
                fontWeight="semibold"
                border="none"
                fontSize="md"
              >
                <Fallback />
              </Td>
            </Tr>
          )}
        </Tbody>
      </TableChakra>
    </TableContainer>
  );
};

export default memo(Table);
