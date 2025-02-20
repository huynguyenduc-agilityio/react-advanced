import { Link } from 'react-router-dom';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

// Constants
import { PUBLIC_ROUTERS } from '@/constants';

const NotFound = () => {
  return (
    <Box mx="auto" textAlign="center">
      <Flex alignItems="center" flexDir="column" pt="82px" pb="100px">
        <Text color="white" fontSize="2xl" fontWeight="semibold">
          Oops! Page not found
        </Text>
        <Text
          color="pastelBlue"
          fontSize="md"
          fontWeight="medium"
          maxW="414px"
          mt="10px"
        >
          The page you are looking for might have been removed or temporarily
          unavailable.
        </Text>

        <Button variant="primary" mt="42px" as={Link} to={PUBLIC_ROUTERS.ROOT}>
          Back to Dashboard
        </Button>
      </Flex>
    </Box>
  );
};

export default NotFound;
