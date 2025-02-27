import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  CircularProgress,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';

// Icon
import { MdInfo } from 'react-icons/md';

// Types
import { IUserNotifications, NotificationType } from '@/types';

// Constants
import {
  GENERAL_FORM_FIELD,
  PUBLIC_ROUTERS,
  SUMMARY_FORM_FIELD,
} from '@/constants';

// Stores
import { useUserForm, useUserFormActions } from '@/stores';

// Utils
import { isFormDirty } from '@/utils';

// Hooks
import { useCreateUser, useUpdateUser } from '@/hooks';

// Components
import NotificationSwitch from '@/components/NotificationSwitch';

export interface INotificationForm {
  initialValues?: IUserNotifications;
}

const NotificationForm = ({ initialValues }: INotificationForm) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { userValidity, isDirty } = useUserForm();
  const { user } = useUserForm();
  const { handleCreateUser, isCreateLoading } = useCreateUser();
  const { handleUpdateUser, isUpdateLoading } = useUpdateUser();
  const { setUserData, setIsDirty, resetUserForm } = useUserFormActions();

  const actionForm = id ? handleUpdateUser : handleCreateUser;
  const isLoading = isCreateLoading || isUpdateLoading;

  const {
    mentionMessage = NotificationType.InApp,
    replyMessage = NotificationType.Email,
    assignTask = NotificationType.Email,
    taskOverdue = NotificationType.InApp,
    dailySummary = NotificationType.Email,
    weeklySummary = NotificationType.InApp,
    monthlySummary = NotificationType.InApp,
    annuallySummary = NotificationType.Email,
  } = initialValues || {};

  const defaultValue: IUserNotifications = {
    mentionMessage,
    replyMessage,
    assignTask,
    taskOverdue,
    dailySummary,
    weeklySummary,
    monthlySummary,
    annuallySummary,
  };

  const { control, watch, reset } = useForm<IUserNotifications>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: defaultValue,
  });

  const handleSubmit = useCallback(async () => {
    await actionForm(user);
    resetUserForm();
    navigate(PUBLIC_ROUTERS.ROOT);
  }, [user, actionForm, resetUserForm, navigate]);

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    } else {
      setUserData(defaultValue);
    }

    const subscription = watch((data) => {
      setUserData(data); // Initialize with current form data

      if (initialValues) {
        setIsDirty(isFormDirty(data, initialValues as Record<string, unknown>));
      } else setIsDirty(true);
    });

    return () => subscription.unsubscribe(); // Cleanup on unmount
  }, [initialValues, reset, setIsDirty, setUserData, watch]);

  return (
    <>
      <VStack spacing={12} w="full">
        <VStack align="start" w="full" spacing={6}>
          <Box>
            <FormLabel fontSize="lg" color="white">
              General notifications
            </FormLabel>
            <Box fontSize="md" color="pastelBlue">
              Lorem ipsum dolor sit amet consectetur adipiscing.
            </Box>
          </Box>
          <VStack
            align="start"
            as="form"
            w="full"
            py={2.5}
            px={8}
            spacing={0}
            borderWidth={1}
            borderRadius="xl"
            borderColor="slateBlue"
            bg="midNightBlue"
          >
            {GENERAL_FORM_FIELD.map(({ key, name, label }) => (
              <Controller
                control={control}
                key={key}
                name={name as keyof IUserNotifications}
                render={({ field }) => (
                  <FormControl my={6}>
                    <Flex align="center">
                      <Flex align="center" mt={1} w="full">
                        <FormLabel
                          fontSize="sm"
                          color="white"
                          textAlign="left"
                          mr={1}
                          mb={0}
                          htmlFor={name}
                        >
                          {label}
                        </FormLabel>
                        <Tooltip
                          label="Lorem ipsum dolor sit amet consectetur adipiscing."
                          placement="top"
                        >
                          <Box>
                            <Icon as={MdInfo} color="pastelBlue" boxSize={3} />
                          </Box>
                        </Tooltip>
                      </Flex>
                      <Box flex="1">
                        <NotificationSwitch
                          {...field}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </Box>
                    </Flex>
                  </FormControl>
                )}
              />
            ))}
          </VStack>
        </VStack>
        <VStack align="start" w="full" spacing={6}>
          <Box>
            <FormLabel fontSize="lg" color="white">
              Summary notifications
            </FormLabel>
            <Box fontSize="md" color="pastelBlue">
              Lorem ipsum dolor sit amet consectetur adipiscing.
            </Box>
          </Box>
          <VStack
            as="form"
            w="full"
            py={2.5}
            px={8}
            spacing={0}
            borderWidth={1}
            borderRadius="xl"
            borderColor="slateBlue"
            bg="midNightBlue"
          >
            {SUMMARY_FORM_FIELD.map(({ key, name, label }) => (
              <Controller
                control={control}
                key={key}
                name={name as keyof IUserNotifications}
                render={({ field }) => (
                  <FormControl my={6}>
                    <Flex align="center">
                      <Flex align="center" mt={1} w="full">
                        <FormLabel
                          fontSize="sm"
                          color="white"
                          textAlign="left"
                          mr={1}
                          mb={0}
                          htmlFor={name}
                        >
                          {label}
                        </FormLabel>
                        <Tooltip
                          label="Lorem ipsum dolor sit amet consectetur adipiscing."
                          placement="top"
                        >
                          <Box>
                            <Icon as={MdInfo} color="pastelBlue" boxSize={3} />
                          </Box>
                        </Tooltip>
                      </Flex>
                      <Box flex="1" minW="143px">
                        <NotificationSwitch {...field} />
                      </Box>
                    </Flex>
                  </FormControl>
                )}
              />
            ))}
          </VStack>
        </VStack>
      </VStack>
      <Flex justifyContent="flex-end" w="full">
        <Button
          variant="primary"
          mt="50px"
          fontSize="lg"
          w="194px"
          h="46px"
          onClick={handleSubmit}
          isDisabled={!userValidity || !isDirty}
        >
          {isLoading && (
            <CircularProgress
              isIndeterminate
              color="white"
              mr={1}
              sx={{ svg: { w: '24px' } }}
            />
          )}
          {id ? 'Update' : 'Add'} User
        </Button>
      </Flex>
    </>
  );
};

export default NotificationForm;
