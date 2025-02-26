export const isFormDirty = <T extends Record<string, unknown>>(
  formData: T,
  initialValues?: T,
): boolean => {
  if (!initialValues) return false;

  return Object.entries(formData).some(
    ([key, value]) => value !== initialValues[key as keyof T],
  );
};
