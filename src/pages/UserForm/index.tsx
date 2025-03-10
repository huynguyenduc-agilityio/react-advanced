import { useParams } from 'react-router-dom';
import { Box, Text, VStack } from '@chakra-ui/react';
import { lazy, Suspense, useEffect, useMemo } from 'react';

// Icons
import { FaUser } from 'react-icons/fa';
import { HiMiniPencil } from 'react-icons/hi2';
import { RiNotification2Fill } from 'react-icons/ri';

// Hooks
import { useGetUser } from '@/hooks';

// Stores
import { useUserFormActions } from '@/stores';

// Themes
import { fonts } from '@/themes/bases/typography';

// Components
import { CardIcon, Fallback, Tabs } from '@/components';

const PersonalForm = lazy(() => import('@/components/Form/PersonalForm'));
const TeamForm = lazy(() => import('@/components/Form/TeamForm'));
const BillForm = lazy(() => import('@/components/Form/BillForm'));
const NotificationForm = lazy(
  () => import('@/components/Form/NotificationForm'),
);

const UserForm = () => {
  const { id = '' } = useParams();
  const { user: userDetail } = useGetUser(id);

  const { setUserData } = useUserFormActions();

  useEffect(() => {
    if (userDetail) setUserData(userDetail);
  }, [userDetail, setUserData]);

  const {
    name,
    email,
    avatar,
    description,
    phone,
    location,
    position,
    website,
    company,
    teamName,
    rank,
    office,
    teamMail,
    payment,
    billName,
    billAddress,
    state,
    zipCode,
    mentionMessage,
    replyMessage,
    assignTask,
    taskOverdue,
    dailySummary,
    weeklySummary,
    monthlySummary,
    annuallySummary,
  } = userDetail || {};

  const TAB_LIST = useMemo(
    () => [
      {
        label: 'Personal Information',
        icon: HiMiniPencil,
        content: (
          <Suspense fallback={<Fallback />}>
            <PersonalForm
              initialValues={{
                name,
                email,
                avatar,
                description,
                phone,
                location,
                position,
                website,
                company,
              }}
            />
          </Suspense>
        ),
      },
      {
        label: 'Team',
        icon: FaUser,
        content: (
          <Suspense fallback={<Fallback />}>
            <TeamForm initialValues={{ teamName, rank, office, teamMail }} />
          </Suspense>
        ),
      },
      {
        label: 'Billing',
        icon: CardIcon,
        content: (
          <Suspense fallback={<Fallback />}>
            <BillForm
              initialValues={{ payment, billName, billAddress, state, zipCode }}
            />
          </Suspense>
        ),
      },
      {
        label: 'Notifications',
        icon: RiNotification2Fill,
        content: (
          <Suspense fallback={<Fallback />}>
            <NotificationForm
              initialValues={{
                mentionMessage,
                replyMessage,
                assignTask,
                taskOverdue,
                dailySummary,
                weeklySummary,
                monthlySummary,
                annuallySummary,
              }}
            />
          </Suspense>
        ),
      },
    ],
    [userDetail],
  );

  return (
    <VStack align="start" gap={0}>
      <Text
        fontFamily={fonts.heading}
        fontSize="xl"
        fontWeight="bold"
        color="white"
      >
        {id ? 'Update' : 'Add'} User
      </Text>
      <Box width="full" mt="100px">
        <Tabs tabs={TAB_LIST} />
      </Box>
    </VStack>
  );
};

export default UserForm;
