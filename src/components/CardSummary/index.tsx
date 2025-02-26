import { memo, ReactNode } from 'react';
import { VscKebabVertical } from 'react-icons/vsc';
import { Box, Flex, Icon, Text } from '@chakra-ui/react';

export interface CardSummaryProps {
  title: string;
  total: number;
  icon?: ReactNode;
}

const CardSummary = ({ title, total, icon }: CardSummaryProps) => {
  return (
    <Box
      w="full"
      bg="midNightBlue"
      p={5}
      border="0.6px solid"
      borderColor="slateBlue"
      borderRadius="lg"
    >
      <Flex gap={3} alignItems="center">
        {icon && <Box>{icon}</Box>}
        <Flex w="full" alignItems="center" justifyContent="space-between">
          <Box>
            <Text fontSize="lg" fontWeight="medium" color="white">
              {title}
            </Text>
            <Text fontSize="sm" color="pastelBlue">
              {total}
            </Text>
          </Box>
          <Icon as={VscKebabVertical} color="white" boxSize="20px" />
        </Flex>
      </Flex>
    </Box>
  );
};

export default memo(CardSummary);
