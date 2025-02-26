import { ReactNode } from 'react';
import { IconType } from 'react-icons';
import {
  Tabs as ChakraTabs,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Text,
} from '@chakra-ui/react';

// Themes
import { fonts } from '@/themes/bases/typography';

type ITabItem = {
  label: string;
  content: ReactNode;
  icon: IconType;
};

type ITabsProps = {
  tabs: ITabItem[];
};

const Tabs = ({ tabs }: ITabsProps) => {
  return (
    <ChakraTabs orientation="vertical" variant="unstyled">
      <TabList minW="250px" gap={2} mr="52px">
        <Text
          as="header"
          fontFamily={fonts.heading}
          fontSize="lg"
          mb={4}
          fontWeight={500}
          color="white"
        >
          Credentials
        </Text>
        {tabs.map(({ label, icon }) => (
          <Tab
            key={label}
            justifyContent="flex-start"
            py={3}
            px={3}
            borderRadius="lg"
            _selected={{ color: 'white', bg: 'darkBlue' }}
            _hover={{ bg: 'darkBlue' }}
          >
            <Icon as={icon} boxSize={3} />
            <Text fontSize="md" ml={1}>
              {label}
            </Text>
          </Tab>
        ))}
      </TabList>
      <TabPanels borderLeft="1px solid" borderColor="slateBlue">
        {tabs.map(({ label, content }) => (
          <TabPanel p="0" ml="97px" key={label}>
            {content}
          </TabPanel>
        ))}
      </TabPanels>
    </ChakraTabs>
  );
};

export default Tabs;
