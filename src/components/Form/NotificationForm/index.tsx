import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
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
import { IUserNotifications } from '@/types';

// Constants
import { GENERAL_FORM_FIELD, SUMMARY_FORM_FIELD } from '@/constants';

// Enums
import { NotificationType } from '@/enums';

// Stores
import { useUserForm, useUserFormActions } from '@/stores';

// Components
import NotificationSwitch from '@/components/NotificationSwitch';

export interface INotificationForm {
  initialValues?: IUserNotifications;
  onSubmit?: () => void;
}

const NotificationForm = ({ initialValues, onSubmit }: INotificationForm) => {
  const { id = '' } = useParams();
  const { userValidity } = useUserForm();
  const { setUserData } = useUserFormActions();

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

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }

    const unsubscribe = watch((data) => setUserData(data)).unsubscribe;
    setUserData(watch()); // Initialize with current form data

    return () => unsubscribe(); // Cleanup on unmount
  }, [initialValues, reset, watch, setUserData]);

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
          onClick={onSubmit}
          isDisabled={!userValidity}
        >
          {id ? 'Update' : 'Add'} User
        </Button>
      </Flex>
    </>
  );
};

export default NotificationForm;
