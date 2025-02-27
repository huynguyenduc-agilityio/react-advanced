import { memo } from 'react';
import { Flex } from '@chakra-ui/react';

// Mocks
import { MOCK_SUMMARY_DASHBOARD } from '@/__mocks__';

// Components
import { CardSummary } from '@/components';

const SummaryDashboard = () => {
  return (
    <Flex w="full" gap={8} mt="50px" mb="30px">
      {MOCK_SUMMARY_DASHBOARD.map(({ title, total, icon: Icon }) => (
        <CardSummary key={title} title={title} total={total} icon={<Icon />} />
      ))}
    </Flex>
  );
};

export default memo(SummaryDashboard);
