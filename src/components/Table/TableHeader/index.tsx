import { memo } from 'react';
import isEqual from 'react-fast-compare';
import { Checkbox, Flex, Icon, Text, Th, Tr } from '@chakra-ui/react';

// Types
import { THeaderTable } from '@/types';

interface TableHeadProps {
  isAllSelected: boolean;
  isIndeterminate: boolean;
  columns?: THeaderTable[];
  onSelectAll: (selected: boolean) => void;
}

const TableHeader = ({
  columns = [],
  isAllSelected,
  isIndeterminate,
  onSelectAll,
}: TableHeadProps) => (
  <Tr>
    <Th py={4} pl={9} pr={0} textAlign="center">
      <Flex>
        <Checkbox
          aria-label="Checkbox Indeterminate"
          isChecked={isAllSelected}
          isIndeterminate={isIndeterminate}
          onChange={(e) => onSelectAll(e.target.checked)}
        />
      </Flex>
    </Th>

    {!!columns.length &&
      columns.map(({ key, title, icon }) => (
        <Th key={key} py={4} textAlign="left" fontFamily="MonaSans-Regular">
          <Flex alignItems="center" gap={1}>
            {icon && <Icon as={icon} boxSize={3} color="pastelBlue" />}
            <Text
              color="white"
              textTransform="none"
              fontWeight="semibold"
              title={title}
            >
              {title}
            </Text>
          </Flex>
        </Th>
      ))}
  </Tr>
);

export default memo(TableHeader, isEqual);
