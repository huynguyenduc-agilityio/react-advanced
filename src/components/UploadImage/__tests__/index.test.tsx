import { fireEvent, render, waitFor } from '@testing-library/react';

import { useUploadImage } from '@/hooks';

import userEvent from '@testing-library/user-event';
import UploadImage from '..';

jest.mock('@/hooks', () => ({
  ...jest.requireActual('@/hooks'),
  useUploadImage: jest.fn(),
}));

describe('UploadImage Component', () => {
  const mockHandleUploadImage = jest.fn();
  const mockOnFileChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useUploadImage as jest.Mock).mockReturnValue({
      handleUploadImage: mockHandleUploadImage,
    });
  });

  it('renders the component with initial props', () => {
    const { getByText } = render(
      <UploadImage onFileChange={mockOnFileChange} />,
    );

    expect(getByText(/Click to upload/i)).toBeInTheDocument();
    expect(getByText(/or drag and drop/i)).toBeInTheDocument();
  });

  it('triggers file input when clicking on upload area', () => {
    const { getByText, getByTestId } = render(
      <UploadImage onFileChange={mockOnFileChange} />,
    );

    const fileInput = getByTestId('file-input');
    jest.spyOn(fileInput, 'click');
    fireEvent.click(getByText(/Click to upload/i));
    expect(fileInput.click).toHaveBeenCalled();
  });

  it('opens file input when clicking on the upload area', async () => {
    const { getByTestId } = render(
      <UploadImage onFileChange={mockOnFileChange} />,
    );

    const fileInput = getByTestId('file-input');
    jest.spyOn(fileInput, 'click');

    await userEvent.click(getByTestId('file-input'));
    expect(fileInput.click).toHaveBeenCalled();
  });

  it('uploads and sets the image when a valid file is selected', async () => {
    const mockImageUrl = 'https://example.com/image.jpg';
    mockHandleUploadImage.mockResolvedValueOnce(mockImageUrl);

    const { getByTestId } = render(
      <UploadImage onFileChange={mockOnFileChange} />,
    );

    const file = new File(['image content'], 'image.jpg', {
      type: 'image/jpeg',
    });
    const fileInput = getByTestId('file-input');

    await userEvent.upload(fileInput, file);

    await waitFor(() =>
      expect(mockHandleUploadImage).toHaveBeenCalledWith(file),
    );
    expect(mockOnFileChange).toHaveBeenCalledWith(mockImageUrl);
  });
});
