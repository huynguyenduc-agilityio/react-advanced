import { memo } from 'react';
import isEqual from 'react-fast-compare';
import { Checkbox, Flex, Td, Tr } from '@chakra-ui/react';

// Types
import { TCellTable } from '@/types';

interface TableRowProps {
  id: string;
  cells: TCellTable[];
  isSelected: boolean;
  onSelect: (rowId: string) => void;
}

const TableRow = ({ id, cells = [], isSelected, onSelect }: TableRowProps) => {
  const handleSelectRecord = () => {
    onSelect(id);
  };

  return (
    <Tr>
      <Td py={4} pl={9} pr={0} textAlign="center">
        <Flex>
          <Checkbox
            aria-label={`Checkbox ${id}`}
            isChecked={isSelected}
            onChange={handleSelectRecord}
          />
        </Flex>
      </Td>
      {cells.map((cell) => (
        <Td
          key={cell.key}
          py={4}
          textAlign="left"
          fontSize="xs"
          color="pastelBlue"
        >
          {cell.content}
        </Td>
      ))}
    </Tr>
  );
};

export default memo(TableRow, isEqual);
