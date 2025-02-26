import {
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Avatar,
  Flex,
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react';

// Constants
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  VALIDATION_RULES,
} from '@/constants';

// Types
import { ToastStatus } from '@/types';

// Hooks
import { useCustomToast, useUploadImage } from '@/hooks';

// Components
import { ImageIcon } from '@/components';
import Fallback from '../Fallback';

export interface TUploadImageProps {
  imageUrl?: string;
  onFileChange: (file: string) => void;
}

const UploadImage = ({ imageUrl = '', onFileChange }: TUploadImageProps) => {
  const { handleUploadImage } = useUploadImage();
  const showToast = useCustomToast();
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(
    imageUrl,
  );
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    control,
    setValue,
    trigger,
    clearErrors,
    formState: { errors },
  } = useForm<{ image: File }>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const handleOpenFile = () => {
    fileInputRef.current?.click();
  };

  const handleUploadFile = useCallback(
    async (file: File) => {
      try {
        const isValid = await trigger('image');

        if (isValid) {
          const imageUrl = await handleUploadImage(file);

          startTransition(() => {
            setSelectedImageUrl(imageUrl);
            onFileChange(imageUrl);
            clearErrors('image');

            showToast({
              status: ToastStatus.Success,
              message: SUCCESS_MESSAGES.IMAGE,
            });
          });
        }
      } catch (error) {
        showToast({
          status: ToastStatus.Error,
          message: ERROR_MESSAGES.UPLOAD_IMAGE_FAILED,
        });
      }
    },
    [clearErrors, handleUploadImage, onFileChange, showToast, trigger],
  );

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (file) {
        setValue('image', file, { shouldValidate: true });

        handleUploadFile(file);
      }
    },
    [handleUploadFile, setValue],
  );

  const handleRemoveImage = useCallback(() => {
    if (selectedImageUrl) {
      URL.revokeObjectURL(selectedImageUrl);
    }
    setSelectedImageUrl(null);
  }, [selectedImageUrl]);

  const renderImage = useMemo(() => {
    if (isPending) {
      return <Fallback />;
    }
    if (selectedImageUrl) {
      return (
        <Flex flexDirection="column" alignItems="center" width="48px">
          <Avatar
            data-testid="uploaded-image"
            src={selectedImageUrl}
            boxSize="48px"
            borderRadius="full"
          />
          <Text
            fontSize="xs"
            cursor="pointer"
            color="pastelBlue"
            _hover={{ color: 'white' }}
            onClick={handleRemoveImage}
          >
            Delete
          </Text>
        </Flex>
      );
    }

    return null;
  }, [handleRemoveImage, isPending, selectedImageUrl]);

  return (
    <Flex direction="column" align="start" gap={4}>
      {renderImage}
      {!selectedImageUrl && (
        <Controller
          control={control}
          rules={VALIDATION_RULES.IMAGE}
          name="image"
          render={() => (
            <FormControl isInvalid={!!errors?.image}>
              <Flex
                p={6}
                textAlign="center"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <IconButton
                  aria-label="Upload image"
                  variant="icon"
                  icon={<ImageIcon />}
                  cursor="pointer"
                  onClick={handleOpenFile}
                />
                <Text fontSize="xs" mt={2} color="pastelBlue">
                  <Text
                    as="span"
                    color="primary"
                    cursor="pointer"
                    onClick={handleOpenFile}
                  >
                    Click to upload
                  </Text>{' '}
                  or drag and drop
                </Text>
                <Text fontSize="xs" color="pastelBlue">
                  SVG, PNG, JPG or GIF (max. 800 x 400px)
                </Text>
                <Input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileChange}
                  hidden
                  id="imageInput"
                  data-testid="file-input"
                />
              </Flex>

              {errors?.image && (
                <FormErrorMessage>
                  <Flex direction="column" gap={4} color="red">
                    <Text>{errors.image.message}</Text>
                    <Text>Please select again!!!</Text>
                  </Flex>
                </FormErrorMessage>
              )}
            </FormControl>
          )}
        />
      )}
    </Flex>
  );
};

export default memo(UploadImage);
