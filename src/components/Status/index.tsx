import { Flex, Text } from '@chakra-ui/react';

// Icons
import { EllipseIcon } from '@/icons';

// Enums
import { Status as StatusEnum } from '@/enums';

export interface StatusProps {
  type?: StatusEnum;
}

const Status = ({ type = StatusEnum.Online }: StatusProps) => {
  return (
    <Flex
      maxW="60px"
      alignItems="center"
      justifyContent="center"
      gap={1}
      px={2}
      py={1}
      borderRadius="2px"
      border="1px solid"
      bg={type === StatusEnum.Online ? '#09363B' : '#39425F'}
      borderColor={type === StatusEnum.Online ? '#067B51' : '#515A79'}
    >
      <EllipseIcon
        color={(type !== StatusEnum.Online && '#AEB9E1') || undefined}
      />
      <Text
        fontWeight="medium"
        fontSize="xs"
        color={type === StatusEnum.Online ? '#14CA74' : 'pastelBlue'}
      >
        {type === StatusEnum.Online ? 'Online' : 'Offline'}
      </Text>
    </Flex>
  );
};

export default Status;
