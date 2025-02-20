import { Box, Image, Text, VStack } from '@chakra-ui/react';

// Icons
import logoSvg from 'public/assets/icons/logo.svg';

export const Logo = () => (
  <Box w="full">
    <VStack flexDirection="row" alignItems="center" gap={2} w="full">
      <Image src={logoSvg} alt="Logo" boxSize="26px" />
      <Text as="h1" color="white" fontSize="xl" fontWeight="bold">
        Dashdark X
      </Text>
    </VStack>
  </Box>
);
