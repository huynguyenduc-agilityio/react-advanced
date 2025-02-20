import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ReactNode, useState } from 'react';

// Icons
import { LuChevronsLeftRight } from 'react-icons/lu';
import logoSvg from '@public/assets/icons/logo.svg';
import { Logo } from './Logo';

import NavCollapse from './NavCollapse';
import SearchBox from '../SearchBox';
import { HiChevronRight } from 'react-icons/hi';
import { FiArrowRight } from 'react-icons/fi';

const Navbar = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box minH="100vh" bg="spaceBlue" color={'pastelBlue'}>
      {/* Navbar */}
      <Box
        as="nav"
        pos="fixed"
        w={isOpen ? '300px' : '64px'}
        h="100vh"
        pt={9}
        pb={10}
        overflowY="auto"
        transition="width 0.3s ease"
        boxShadow="0px 0px 28px rgba(1, 5, 17, 0.3)"
      >
        <VStack
          display="flex"
          flexDirection="row"
          mb={3}
          px={isOpen ? 7 : 0}
          alignItems="center"
          justifyContent={isOpen ? 'space-between' : 'center'}
        >
          {isOpen && <Logo />}
          {isOpen ? (
            <Icon
              as={LuChevronsLeftRight}
              width={'full'}
              boxSize="22px"
              cursor="pointer"
              onClick={handleToggleDrawer}
            />
          ) : (
            <Image
              src={logoSvg}
              alt="Logo"
              boxSize="26px"
              cursor="pointer"
              onClick={handleToggleDrawer}
            />
          )}
        </VStack>

        {isOpen && (
          <>
            <Box px={7} py={8}>
              <SearchBox onChange={() => {}} />
            </Box>
            <NavCollapse />
            <Flex justify="space-between" align="end" pl={7} pr="44px" mt={6}>
              <Flex align="center" gap={2}>
                <Avatar
                  name="John Carter"
                  src="/path-to-avatar.jpg"
                  size="sm"
                />
                <Flex direction="column">
                  <Text fontWeight="medium" fontSize="sm" color="white">
                    John Carter
                  </Text>
                  <Text color="gray.400" fontWeight="medium" fontSize="xs">
                    Account settings
                  </Text>
                </Flex>
              </Flex>

              <Icon as={HiChevronRight} fontSize="12" />
            </Flex>

            <Box p={4} mt={16}>
              <Button
                w="full"
                fontSize="lg"
                py={4}
                bg="linear-gradient(90deg, rgba(203,60,255,1) 20%, rgba(127,37,251,1) 68%)"
                height="46px"
                rightIcon={<FiArrowRight />}
              >
                Get template
              </Button>
            </Box>
          </>
        )}
      </Box>

      {/* Main Content */}
      <Box
        as="main"
        minH="100vh"
        ml={isOpen ? '300px' : '64px'}
        px={10}
        py="30px"
        flex="1"
        bg="spaceBlue"
        transition="margin 0.3s ease"
      >
        {children}
      </Box>
    </Box>
  );
};

export default Navbar;
