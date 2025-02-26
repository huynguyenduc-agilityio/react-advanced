import { useToast } from '@chakra-ui/react';

// Types
import { ToastStatus } from '@/types';

interface ICustomToastProps {
  status: ToastStatus;
  message: string;
}

export const useCustomToast = () => {
  const toast = useToast();

  return ({ status, message }: ICustomToastProps) => {
    toast({
      title: message,
      status: status,
      position: 'top-right',
      isClosable: true,
      variant: 'left-accent',
      duration: 3000,
      containerStyle: {
        fontSize: 'sm',
      },
    });
  };
};
