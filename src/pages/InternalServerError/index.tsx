import { Link } from 'react-router-dom';
import { Box, Button, Center, Heading, Text } from '@chakra-ui/react';

// Constants
import { PUBLIC_ROUTERS } from '@/constants';

const InternalServerError = () => {
  return (
    <Center py="300px">
      <Box textAlign="center">
        <Heading as="h1" color="secondary.400" fontSize="2xl">
          500 Internal Server Error
        </Heading>
        <Text
          color="secondary.300"
          fontSize="lg"
          fontWeight="medium"
          maxW="414px"
          mt="10px"
        >
          Sorry, something went wrong. :(
        </Text>

        <Button variant="primary" mt="42px" as={Link} to={PUBLIC_ROUTERS.ROOT}>
          Back to Dashboard
        </Button>
      </Box>
    </Center>
  );
};

export default InternalServerError;
