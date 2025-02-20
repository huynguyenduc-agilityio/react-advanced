import { useToast } from '@chakra-ui/react';

// Enums
import { ToastStatus } from '@/enums';

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
