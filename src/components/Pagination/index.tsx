import { memo } from 'react';
import { Button, Flex, Icon, Select, Text } from '@chakra-ui/react';

// Icons
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

// Constants
import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_TOTAL,
  OPTION_LIMITS,
} from '@/constants';

// Utils
import { getRecordRange } from '@/utils';

interface PaginationProps {
  totalRecords?: number;
  pageSize?: number;
  currentPage?: number;
  isDisabledPrev?: boolean;
  isDisableNext?: boolean;
  onPageChange?: (direction: string) => void;
  onChangeLimit?: (value: number) => void;
}

const Pagination = ({
  currentPage = DEFAULT_CURRENT_PAGE,
  pageSize = DEFAULT_PAGE_SIZE,
  totalRecords = DEFAULT_TOTAL,
  isDisabledPrev,
  isDisableNext,
  onPageChange,
  onChangeLimit,
}: PaginationProps) => {
  const handleNextPage = () => onPageChange?.('next');

  const handlePrevPage = () => onPageChange?.('prev');

  const handleChangeLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeLimit?.(Number(e.target.value));
  };

  return (
    <Flex w="full" justifyContent="space-between" mt={6}>
      <Flex alignItems="center">
        <Text fontSize="sm" fontWeight="regular" color="white">
          {getRecordRange(currentPage, pageSize, totalRecords)}
        </Text>
      </Flex>
      <Flex align="center" gap="60px">
        <Flex align="center" gap={3}>
          <Text color="pastelBlue" fontSize="sm" fontWeight="medium">
            Rows per page:
          </Text>
          <Select
            title="select-limit"
            defaultValue={pageSize}
            onChange={handleChangeLimit}
            aria-label="rows-per-page"
            bg="darkBlue"
            border="1px solid"
            borderColor="midNightBlue"
            borderRadius="base"
            fontSize="xs"
            color="pastelBlue"
            w="fit-content"
          >
            {OPTION_LIMITS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" gap={2}>
          <Button
            variant="icon"
            title="prev-button"
            bg="darkBlue"
            border="1px solid"
            borderColor="midNightBlue"
            borderRadius="base"
            minWidth="26px"
            height="26px"
            p={0}
            isDisabled={isDisabledPrev}
            onClick={handlePrevPage}
          >
            <Icon as={FiArrowLeft} boxSize={3} color="whiteSmoke" />
          </Button>
          <Button
            variant="icon"
            title="next-button"
            bg="darkBlue"
            border="1px solid"
            borderColor="midNightBlue"
            borderRadius="base"
            minWidth="26px"
            height="26px"
            p={0}
            isDisabled={isDisableNext}
            onClick={handleNextPage}
          >
            <Icon as={FiArrowRight} boxSize={3} color="whiteSmoke" />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default memo(Pagination);
