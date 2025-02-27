import { memo, useCallback, useDeferredValue } from 'react';
import isEqual from 'react-fast-compare';
import { Link } from 'react-router-dom';
import { Button, Flex, Text } from '@chakra-ui/react';

import { DEFAULT_CURRENT_PAGE, PUBLIC_ROUTERS } from '@/constants';

import { fonts } from '@/themes/bases/typography';

import { SearchBox } from '@/components';
import { useUserFilterStore } from '@/stores';

const FilterDashboard = ({
  onSetPage,
}: {
  onSetPage: (page: number) => void;
}) => {
  const { search, setSearch } = useUserFilterStore();
  const deferredQuery = useDeferredValue(search);

  const handleSearch = useCallback(
    (value: string) => {
      setSearch(value);
      onSetPage(DEFAULT_CURRENT_PAGE);
    },
    [setSearch],
  );
  return (
    <Flex justifyContent="space-between" width="full">
      <Flex alignItems="center" gap="50px">
        <Text
          fontFamily={fonts.heading}
          fontSize="xl"
          fontWeight="bold"
          color="white"
        >
          Users
        </Text>

        <SearchBox
          defaultValue={deferredQuery}
          onChange={handleSearch}
          w="352px"
        />
      </Flex>

      <Link to={PUBLIC_ROUTERS.USER_ADD}>
        <Button variant="primary" title="Add User" width="137px">
          Add User
        </Button>
      </Link>
    </Flex>
  );
};

export default memo(FilterDashboard, isEqual);
