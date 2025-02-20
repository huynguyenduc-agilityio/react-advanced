import {
  Switch as ChakraSwitch,
  Flex,
  Icon,
  SwitchProps,
  Text,
} from '@chakra-ui/react';

// Icons
import { HiMail } from 'react-icons/hi';
import { DevicePhoneIcon } from '@/icons';

// Enums
import { NotificationType } from '@/enums';

type TNotificationSwitchProps = Omit<SwitchProps, 'onChange'> & {
  name?: string;
  value?: NotificationType;
  onChange: (value: NotificationType) => void;
};

const NotificationSwitch = ({
  name,
  value = NotificationType.InApp,
  onChange,
  ...rest
}: TNotificationSwitchProps) => {
  const isChecked = value === NotificationType.Email;

  const handleToggle = () => {
    const newValue = isChecked
      ? NotificationType.InApp
      : NotificationType.Email;

    onChange(newValue);
  };

  return (
    <Flex
      minW="143px"
      align="center"
      justify="center"
      cursor="pointer"
      onClick={handleToggle}
    >
      <Flex
        align="center"
        justifyContent="center"
        gap={2}
        w="full"
        py="6px"
        borderStartRadius="base"
        bg={!isChecked ? 'primary' : 'darkBlue'}
        color={!isChecked ? 'white' : 'pastelBlue'}
        transition="background 0.3s"
      >
        <Icon as={DevicePhoneIcon} />
        <Text fontSize="sm">In-app</Text>
      </Flex>
      <ChakraSwitch
        hidden
        isChecked={isChecked}
        onChange={handleToggle}
        name={name}
        {...rest}
      />
      <Flex
        align="center"
        justifyContent="center"
        gap={2}
        w="full"
        py="6px"
        borderEndRadius="base"
        bg={isChecked ? 'primary' : 'darkBlue'}
        color={isChecked ? 'white' : 'pastelBlue'}
        transition="background 0.3s"
      >
        <Icon as={HiMail} />
        <Text fontSize="sm">Email</Text>
      </Flex>
    </Flex>
  );
};

export default NotificationSwitch;
