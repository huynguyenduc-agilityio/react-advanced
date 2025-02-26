import { act } from 'react';

// Stores
import { useFormStore } from '..';

// Reset store between tests
beforeEach(() => {
  act(() => {
    useFormStore.getState().actions.resetUserForm();
  });
});

describe('useUserForm Store', () => {
  test('should initialize with default state', () => {
    const state = useFormStore.getState();

    expect(state.user).toEqual({});
    expect(state.userValidity).toBe(false);
    expect(state.formValidity).toEqual({
      personal: false,
      team: false,
      bill: false,
    });
  });

  test('should update user data', () => {
    act(() => {
      useFormStore.getState().actions.setUserData({ name: 'John Doe' });
    });

    const state = useFormStore.getState();
    expect(state.user).toEqual({ name: 'John Doe' });
  });

  test('should update form validity and userValidity', () => {
    act(() => {
      useFormStore.getState().actions.setFormValidity('personal', true);
      useFormStore.getState().actions.setFormValidity('team', true);
      useFormStore.getState().actions.setFormValidity('bill', true);
    });

    const state = useFormStore.getState();
    expect(state.formValidity).toEqual({
      personal: true,
      team: true,
      bill: true,
    });
    expect(state.userValidity).toBe(true);
  });

  test('should reset the user form', () => {
    act(() => {
      useFormStore.getState().actions.setUserData({ name: 'John Doe' });
      useFormStore.getState().actions.setFormValidity('personal', true);
      useFormStore.getState().actions.setFormValidity('team', true);
      useFormStore.getState().actions.setFormValidity('bill', true);
    });

    act(() => {
      useFormStore.getState().actions.resetUserForm();
    });

    const state = useFormStore.getState();
    expect(state.user).toEqual({});
    expect(state.userValidity).toBe(false);
    expect(state.formValidity).toEqual({
      personal: false,
      team: false,
      bill: false,
    });
  });
});
