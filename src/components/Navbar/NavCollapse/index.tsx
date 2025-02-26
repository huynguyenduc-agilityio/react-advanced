import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Flex,
  Icon,
  VStack,
} from '@chakra-ui/react';

// Icons
import { HiChevronDown, HiChevronRight } from 'react-icons/hi';

import navigationConfig from './navigationConfig';
import { NavItem } from '../NavItem';

const NavCollapse = () => {
  return (
    <Accordion allowToggle>
      <VStack spacing={4} align="stretch">
        {navigationConfig.map(({ title, subNav, icon }) => (
          <Box key={title}>
            {title === 'Settings' && <Divider color="white" my={1} />}
            <AccordionItem border="none" px={7}>
              {({ isExpanded }) => (
                <>
                  <AccordionButton
                    py="10px"
                    pl={0}
                    pr={4}
                    _hover={{ color: isExpanded ? 'primary' : 'white' }}
                    color={isExpanded ? 'primary' : 'pastelBlue'}
                  >
                    <Flex
                      w="full"
                      align="center"
                      justifyContent={'space-between'}
                    >
                      {icon && (
                        <Box w="14px" height="14px">
                          <Icon as={icon} />
                        </Box>
                      )}
                      <Box flex="1" textAlign="left" ml="4">
                        {title}
                      </Box>
                      <Icon
                        as={isExpanded ? HiChevronDown : HiChevronRight}
                        fontSize="12"
                        data-testid="chevron-icon"
                      />
                    </Flex>
                  </AccordionButton>
                  <AccordionPanel px={0}>
                    <VStack align="start">
                      {subNav.length > 0 &&
                        subNav.map(({ title, url }) => (
                          <NavItem key={title} subTitle={title} url={url} />
                        ))}
                    </VStack>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          </Box>
        ))}
      </VStack>
    </Accordion>
  );
};

export default NavCollapse;
