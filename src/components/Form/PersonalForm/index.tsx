import { useCallback, useEffect } from 'react';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Switch,
  VStack,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';

// Icons
import { PhotoIcon } from '@/components';
import { HiMiniPencil } from 'react-icons/hi2';
import { FaUser } from 'react-icons/fa';

// Constants
import { BASIC_FORM_FIELD, PERSONAL_FORM_FIELD } from '@/constants';

// Types
import { IUserPersonalInfo, Status } from '@/types';

// Utils
import { isFormDirty, personalFormSchema } from '@/utils';

// Stores
import { useUserFormActions } from '@/stores';

// Components
import TextareaField from '@/components/TextareaField';
import TextField from '@/components/TextField';
import UploadImage from '@/components/UploadImage';

export interface IPersonalForm {
  initialValues?: Partial<IUserPersonalInfo>;
}

const PersonalForm = ({ initialValues }: IPersonalForm) => {
  const { setUserData, setFormValidity, setIsDirty } = useUserFormActions();

  const {
    name = '',
    email = '',
    avatar = '',
    description = '',
    phone = '',
    location = '',
    position = '',
    website = '',
    company = '',
    status = Status.Online,
  } = initialValues || {};
  const defaultValues: IUserPersonalInfo = {
    name,
    email,
    avatar,
    description,
    phone,
    location,
    position,
    website,
    company,
    status,
  };

  const { control, watch, setValue, formState, reset } =
    useForm<IUserPersonalInfo>({
      mode: 'onBlur',
      reValidateMode: 'onChange',
      resolver: valibotResolver(personalFormSchema),
      defaultValues,
    });

  const handleFileChange = useCallback(
    (file: string) => {
      setValue('avatar', file, { shouldDirty: true });
    },
    [setValue],
  );

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }

    const subscription = watch((data) => {
      setUserData(data); // Initialize with current form data

      if (initialValues) {
        setIsDirty(isFormDirty(data, initialValues));
      } else setIsDirty(true);
    });

    return () => subscription.unsubscribe();
  }, [initialValues, reset, setIsDirty, setUserData, watch]);

  useEffect(() => {
    setFormValidity('personal', formState.isValid);
  }, [formState.isValid, setFormValidity]);

  return (
    <VStack spacing={12} w="full">
      <VStack align="start" w="full" spacing={6}>
        <Box>
          <FormLabel fontSize="lg" color="white">
            Personal Information
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
          {PERSONAL_FORM_FIELD.map(
            ({ label, name, placeholder, isRequired, icon }) => (
              <Box
                key={name}
                w="full"
                borderBottom="0.6px solid"
                borderColor="slateBlue"
                _last={{ borderBottom: 'none' }}
              >
                <Controller
                  key={name}
                  control={control}
                  name={name as keyof IUserPersonalInfo}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      label={label}
                      placeholder={placeholder}
                      icon={icon}
                      isRequired={isRequired}
                      {...field}
                      isError={!!error}
                      errorMessages={error?.message}
                      aria-label={label}
                    />
                  )}
                />
              </Box>
            ),
          )}
          <Box w="full" borderBottom="0.6px solid" borderColor="slateBlue">
            <FormControl my={6}>
              <Flex align="start">
                <Flex align="center" mt={1}>
                  <Icon as={PhotoIcon} color="white" boxSize={3} />
                  <FormLabel
                    fontSize="sm"
                    color="white"
                    w="168px"
                    textAlign="left"
                    ml={1}
                    mb={0}
                  >
                    Photo
                  </FormLabel>
                </Flex>
                <Box flex="1">
                  <UploadImage
                    imageUrl={avatar}
                    onFileChange={handleFileChange}
                  />
                </Box>
              </Flex>
            </FormControl>
          </Box>

          <Box
            key={name}
            w="full"
            borderBottom="0.6px solid"
            borderColor="slateBlue"
          >
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <FormControl my={6}>
                  <Flex align="start">
                    <Flex align="center" mt={1}>
                      <Icon as={FaUser} color="white" boxSize={3} />
                      <FormLabel
                        fontSize="sm"
                        color="white"
                        w="168px"
                        textAlign="left"
                        mb={0}
                        ml={1}
                      >
                        Status
                      </FormLabel>
                    </Flex>
                    <Box flex="1">
                      <Switch
                        isChecked={field.value === Status.Online}
                        onChange={(e) =>
                          field.onChange(
                            e.target.checked ? Status.Online : Status.Offline,
                          )
                        }
                        sx={{
                          '.chakra-switch__track[data-checked]': {
                            bg: 'primary',
                          },
                        }}
                      />
                    </Box>
                  </Flex>
                </FormControl>
              )}
            />
          </Box>

          <Controller
            control={control}
            name="description"
            render={({ field, fieldState: { error } }) => (
              <TextareaField
                label="Description"
                placeholder="Write a short bio about you..."
                icon={HiMiniPencil}
                {...field}
                isError={!!error}
                errorMessages={error?.message}
                aria-label="description"
              />
            )}
          />
        </VStack>
      </VStack>
      <VStack align="start" w="full" spacing={6}>
        <Box>
          <FormLabel fontSize="lg" color="white">
            Basic Information
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
          {BASIC_FORM_FIELD.map(
            ({ label, name, placeholder, isRequired, icon }) => (
              <Box
                key={name}
                w="full"
                borderBottom="0.6px solid"
                borderColor="slateBlue"
                _last={{ borderBottom: 'none' }}
              >
                <Controller
                  key={name}
                  control={control}
                  name={name as keyof IUserPersonalInfo}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      label={label}
                      placeholder={placeholder}
                      icon={icon}
                      isRequired={isRequired}
                      {...field}
                      isError={!!error}
                      errorMessages={error?.message}
                      aria-label={label}
                    />
                  )}
                />
              </Box>
            ),
          )}
        </VStack>
      </VStack>
    </VStack>
  );
};

export default PersonalForm;
