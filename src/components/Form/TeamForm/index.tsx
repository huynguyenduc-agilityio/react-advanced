import { useEffect } from 'react';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Select,
  VStack,
} from '@chakra-ui/react';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { Controller, useForm } from 'react-hook-form';

// Constants
import { TEAM_FORM_FIELD } from '@/constants';

// Types
import { IUserTeamInfo } from '@/types';

// Utils
import { isFormDirty, teamFormSchema } from '@/utils';

// Stores
import { useUserFormActions } from '@/stores';

// Components
import TextField from '@/components/TextField';

export interface ITeamFormProps {
  initialValues?: Partial<IUserTeamInfo>;
}

const TeamForm = ({ initialValues }: ITeamFormProps) => {
  const { setUserData, setFormValidity, setIsDirty } = useUserFormActions();
  const {
    teamName = '',
    rank = '',
    office = '',
    teamMail = '',
  } = initialValues || {};
  const defaultValues: IUserTeamInfo = {
    teamName,
    rank,
    office,
    teamMail,
  };

  const { control, watch, formState, reset } = useForm<IUserTeamInfo>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: valibotResolver(teamFormSchema),
    defaultValues,
  });

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

    return () => subscription.unsubscribe(); // Cleanup on unmount
  }, [initialValues, reset, setIsDirty, setUserData, watch]);

  useEffect(() => {
    setFormValidity('team', formState.isValid);
  }, [formState.isValid, setFormValidity]);

  return (
    <VStack align="start" w="full" spacing={6}>
      <Box>
        <FormLabel fontSize="lg" color="white">
          Team Information
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
        {TEAM_FORM_FIELD.map(
          ({ label, name, placeholder, type, options, isRequired, icon }) => (
            <Box
              key={name}
              w="full"
              borderBottom="0.6px solid"
              borderColor="slateBlue"
              _last={{ borderBottom: 'none' }}
            >
              <Controller
                control={control}
                name={name as keyof IUserTeamInfo}
                render={({ field, fieldState: { error } }) =>
                  type === 'select' ? (
                    <FormControl my={6} isRequired={isRequired}>
                      <Flex align="start">
                        <Flex align="center" mt={1}>
                          <Icon as={icon} color="white" boxSize={3} />
                          <FormLabel
                            fontSize="sm"
                            color="white"
                            w="168px"
                            textAlign="left"
                            ml={1}
                            mb={0}
                          >
                            {label}
                          </FormLabel>
                        </Flex>
                        <Box flex="1">
                          <Select
                            variant="primary"
                            {...field}
                            isInvalid={!!error}
                          >
                            <option value="" disabled hidden>
                              {placeholder}
                            </option>
                            {options.map(({ label, value }) => (
                              <option key={value} value={value}>
                                {label}
                              </option>
                            ))}
                          </Select>
                        </Box>
                      </Flex>
                    </FormControl>
                  ) : (
                    <TextField
                      label={label}
                      placeholder={placeholder}
                      icon={icon}
                      isRequired={isRequired}
                      {...field}
                      isError={!!error}
                      errorMessages={error?.message}
                    />
                  )
                }
              />
            </Box>
          ),
        )}
      </VStack>
    </VStack>
  );
};

export default TeamForm;
