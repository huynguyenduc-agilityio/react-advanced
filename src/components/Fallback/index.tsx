import { Center, Spinner } from '@chakra-ui/react';

const Fallback = () => (
  <Center h="100%">
    <Spinner title="Fallback" size="xl" />
  </Center>
);

export default Fallback;
