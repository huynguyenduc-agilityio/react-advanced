import { isFormDirty } from '..';

describe('isFormDirty', () => {
  it('should return false if initialValues is undefined', () => {
    const formData = { name: 'John', age: 30 };

    expect(isFormDirty(formData)).toBe(false);
  });

  it('should return false if formData is the same as initialValues', () => {
    const formData = { name: 'John', age: 30 };
    const initialValues = { name: 'John', age: 30 };

    expect(isFormDirty(formData, initialValues)).toBe(false);
  });

  it('should return true if at least one field differs', () => {
    const formData = { name: 'John', age: 31 };
    const initialValues = { name: 'John', age: 30 };

    expect(isFormDirty(formData, initialValues)).toBe(true);
  });

  it('should return true if a new field is added to formData', () => {
    const formData = { name: 'John', age: 30, email: 'john@example.com' };
    const initialValues = { name: 'John', age: 30 };

    expect(isFormDirty(formData, initialValues)).toBe(true);
  });

  it('should return true if a field is removed from formData', () => {
    const formData = { name: 'John' };
    const initialValues = { name: 'John', age: 30 };

    expect(isFormDirty(formData, initialValues)).toBe(false);
  });

  it('should perform a shallow comparison and return true if a nested object changes reference', () => {
    const formData = { user: { name: 'John' } };
    const initialValues = { user: { name: 'John' } };

    expect(isFormDirty(formData, initialValues)).toBe(true);
  });
});
