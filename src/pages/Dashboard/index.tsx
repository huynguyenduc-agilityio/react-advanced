import { useCallback, useState } from 'react';
import { VStack } from '@chakra-ui/react';

// Constants
import { DEFAULT_CURRENT_PAGE } from '@/constants';

import FilterDashboard from './FilterDashboard';
import SummaryDashboard from './SummaryDashboard';
import TableDashboard from './TableDashboard';

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_CURRENT_PAGE);

  const handleSetPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <VStack align="start" gap={0}>
      <FilterDashboard onSetPage={handleSetPage} />
      <SummaryDashboard />
      <TableDashboard currentPage={currentPage} onSetPage={handleSetPage} />
    </VStack>
  );
};

export default Dashboard;
