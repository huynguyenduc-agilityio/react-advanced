import { lazy, Suspense, useCallback, useEffect, useMemo } from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

// Icons
import { FaUser } from 'react-icons/fa';
import { HiMiniPencil } from 'react-icons/hi2';
import { RiNotification2Fill } from 'react-icons/ri';

// Constants
import { PUBLIC_ROUTERS } from '@/constants';

// Hooks
import { useCreateUser, useGetUser, useUpdateUser } from '@/hooks';

// Stores
import { useUserForm, useUserFormActions } from '@/stores';

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
  const navigate = useNavigate();

  const { id = '' } = useParams();
  const { user: userDetail } = useGetUser(id);

  const { handleCreateUser } = useCreateUser();
  const { handleUpdateUser } = useUpdateUser();

  const { user } = useUserForm();
  const { setUserData, resetUserForm } = useUserFormActions();

  const actionForm = id ? handleUpdateUser : handleCreateUser;

  useEffect(() => {
    if (userDetail) setUserData(userDetail);
  }, [userDetail, setUserData]);

  const handleSubmit = useCallback(async () => {
    await actionForm(user);
    resetUserForm();
    navigate(PUBLIC_ROUTERS.ROOT);
  }, [user, actionForm, resetUserForm, navigate]);

  const TAB_LIST = useMemo(
    () => [
      {
        label: 'Personal Information',
        icon: HiMiniPencil,
        content: (
          <Suspense fallback={<Fallback />}>
            <PersonalForm initialValues={userDetail} />
          </Suspense>
        ),
      },
      {
        label: 'Team',
        icon: FaUser,
        content: (
          <Suspense fallback={<Fallback />}>
            <TeamForm initialValues={userDetail} />
          </Suspense>
        ),
      },
      {
        label: 'Billing',
        icon: CardIcon,
        content: (
          <Suspense fallback={<Fallback />}>
            <BillForm initialValues={userDetail} />
          </Suspense>
        ),
      },
      {
        label: 'Notifications',
        icon: RiNotification2Fill,
        content: (
          <Suspense fallback={<Fallback />}>
            <NotificationForm
              initialValues={userDetail}
              onSubmit={handleSubmit}
            />
          </Suspense>
        ),
      },
    ],
    [userDetail, handleSubmit],
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
