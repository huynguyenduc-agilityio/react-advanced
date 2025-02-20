import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';

// Contexts
import { useConfirmationDialog } from '@/contexts';

const ConfirmDialog = () => {
  const { isOpen, onClose, confirmInfo } = useConfirmationDialog();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const handleConfirm = () => {
    confirmInfo.onConfirm();
    onClose();
  };

  const handleCancel = () => {
    confirmInfo.onCancel?.();
    onClose();
  };

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      isCentered
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent bgColor="midNightBlue">
          <AlertDialogHeader fontSize="lg" fontWeight="bold" color="white">
            {confirmInfo.title}
          </AlertDialogHeader>

          <AlertDialogBody
            color="pastelBlue"
            fontSize="md"
            px="35px"
            py="24px"
            borderY="0.6px solid"
            borderColor="slateBlue"
          >
            {confirmInfo.confirmMessage}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              variant="outline"
              fontSize="md"
              ref={cancelRef}
              onClick={handleCancel}
              fontWeight="bold"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              fontSize="md"
              onClick={handleConfirm}
              ml={3}
              fontWeight="bold"
            >
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmDialog;
