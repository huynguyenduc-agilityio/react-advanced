import { createContext, ReactNode, useContext, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';

type DialogProps = {
  title: string;
  confirmMessage: ReactNode;
  onConfirm: () => void;
  onCancel?: () => void;
};

const initialValue: DialogProps = {
  title: '',
  confirmMessage: '',
  onCancel: undefined,
  onConfirm: () => {},
};

type ContextDefaultValue = {
  confirmInfo: DialogProps;
  confirm: (confirmInfo: DialogProps) => void;
  isOpen: boolean;
  onClose: () => void;
};

const ctxDefaultValue: ContextDefaultValue = {
  confirmInfo: initialValue,
  confirm: () => {},
  isOpen: false,
  onClose: () => {},
};

const ConfirmationDialogContext = createContext(ctxDefaultValue);

const useConfirmationDialog = () => useContext(ConfirmationDialogContext);

const ConfirmationDialogProvider = ({ children }: { children: ReactNode }) => {
  const [confirmInfo, setConfirmInfo] = useState(initialValue);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleConfirm = (dialogInfo: DialogProps) => {
    setConfirmInfo(dialogInfo);
    onOpen();
  };

  return (
    <ConfirmationDialogContext.Provider
      value={{ confirmInfo, confirm: handleConfirm, isOpen, onClose }}
    >
      {children}
    </ConfirmationDialogContext.Provider>
  );
};

export { ConfirmationDialogProvider, useConfirmationDialog };
