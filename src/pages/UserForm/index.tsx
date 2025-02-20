import { useCallback, useEffect, useMemo } from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

// Icons
import { FaCreditCard, FaUser } from 'react-icons/fa';
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
import { Tabs } from '@/components';
import {
  BillForm,
  NotificationForm,
  PersonalForm,
  TeamForm,
} from '@/components/Form';

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

  const TABS_LIST = useMemo(
    () => [
      {
        label: 'Personal Information',
        icon: HiMiniPencil,
        content: <PersonalForm initialValues={userDetail} />,
      },
      {
        label: 'Team',
        icon: FaUser,
        content: <TeamForm initialValues={userDetail} />,
      },
      {
        label: 'Billing',
        icon: FaCreditCard,
        content: <BillForm initialValues={userDetail} />,
      },
      {
        label: 'Notifications',
        icon: RiNotification2Fill,
        content: (
          <NotificationForm
            initialValues={userDetail}
            onSubmit={handleSubmit}
          />
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
        <Tabs tabs={TABS_LIST} />
      </Box>
    </VStack>
  );
};

export default UserForm;
