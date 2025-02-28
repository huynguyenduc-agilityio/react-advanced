export const ERROR_MESSAGES = {
  FIELD_REQUIRED: (fieldName: string) => `${fieldName} is required`,
  MAX_SIZE_IMAGE: 'Image size must be less than 3MB',
  INVALID_FILE_TYPE: 'File must be a PNG, JPEG, or JPG',
  EMPTY_DATA: 'No data found',
  INVALID_EMAIL: 'Invalid email address',
  INVALID_PHONE: 'The number entered is not valid',
  DELETE_USER: 'An error occurred while deleting the user',
  ADD_USER: 'An error occurred while adding the user',
  UPDATE_USER: 'An error occurred while updating the user',
  UPLOAD_IMAGE_FAILED: 'Upload image failed',
};

export const SUCCESS_MESSAGES = {
  ADD_USER: 'User added successfully',
  UPDATE_USER: 'User updated successfully',
  DELETE_USER: 'User deleted successfully',
  IMAGE: 'Image uploaded successfully',
};
