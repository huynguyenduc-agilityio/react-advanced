import { useEffect } from 'react';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { Controller, useForm } from 'react-hook-form';

import { Box, FormLabel, VStack } from '@chakra-ui/react';

// Constants
import { BILL_FORM_FIELD, PAYMENT_METHODS } from '@/constants';

// Types
import { IUserBillInfo } from '@/types';

// Utils
import { billFormSchema, isFormDirty } from '@/utils';

// Stores
import { useUserFormActions } from '@/stores';

// Components
import { PaymentMethod, TextField } from '@/components';

export interface IBillForm {
  initialValues?: Partial<IUserBillInfo>;
}

const BillForm = ({ initialValues }: IBillForm) => {
  const { setUserData, setFormValidity, setIsDirty } = useUserFormActions();
  const {
    payment = PAYMENT_METHODS[0]?.value,
    billName = '',
    billAddress = '',
    state = '',
    zipCode = '',
  } = initialValues || {};

  const defaultValues: IUserBillInfo = {
    payment,
    billName,
    billAddress,
    state,
    zipCode,
  };

  const { control, watch, formState, reset } = useForm<IUserBillInfo>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: valibotResolver(billFormSchema),
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
    setFormValidity('bill', formState.isValid);
  }, [formState.isValid, setFormValidity]);

  return (
    <VStack align="start" w="full" spacing={6}>
      <Box>
        <FormLabel fontSize="lg" color="white">
          Payment methods
        </FormLabel>
        <Box fontSize="md" color="pastelBlue">
          Lorem ipsum dolor sit amet consectetur adipiscing.
        </Box>
      </Box>

      <VStack
        as="form"
        align="start"
        w="full"
        py={2.5}
        px={8}
        spacing={0}
        borderWidth={1}
        borderRadius="xl"
        borderColor="slateBlue"
        bg="midNightBlue"
      >
        <Box w="full" mt={6} mb="94px">
          <Controller
            control={control}
            key="payment"
            name="payment"
            render={({ field }) => (
              <PaymentMethod options={PAYMENT_METHODS} {...field} />
            )}
          />
        </Box>

        <Box mb={5}>
          <FormLabel fontSize="lg" color="white">
            Billing address
          </FormLabel>
          <Box fontSize="md" color="pastelBlue">
            Lorem ipsum dolor sit amet consectetur adipiscing.
          </Box>
        </Box>
        {BILL_FORM_FIELD.map(
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
                name={name as keyof IUserBillInfo}
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
  );
};

export default BillForm;
