import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { produce } from 'immer';

// Types
import { IUserModel } from '@/types';

interface IInitialState {
  user: Partial<IUserModel>;
  userValidity: boolean;
}

const initialState: IInitialState = {
  user: {},
  userValidity: false,
};

interface IFormState extends IInitialState {
  formValidity: {
    personal: boolean;
    team: boolean;
    bill: boolean;
  };
  actions: {
    setUserData: (data: Partial<IUserModel>) => void;
    setFormValidity: (
      form: 'personal' | 'team' | 'bill',
      isValid: boolean,
    ) => void;
    resetUserForm: () => void;
  };
}

const useFormStore = create<IFormState>()(
  devtools((set) => ({
    ...initialState,
    formValidity: {
      personal: false,
      team: false,
      bill: false,
    },
    actions: {
      setUserData: (data) =>
        set(
          produce((state) => {
            state.user = { ...state.user, ...data };
          }),
        ),
      setFormValidity: (form, isValid) =>
        set(
          produce((state) => {
            state.formValidity[form] = isValid;
            state.userValidity =
              state.formValidity.personal &&
              state.formValidity.team &&
              state.formValidity.bill;
          }),
        ),
      resetUserForm: () =>
        set(
          produce((state) => {
            state.user = {};
            state.formValidity = { personal: false, team: false, bill: false };
            state.userValidity = false;
          }),
        ),
    },
  })),
);

export const useUserForm = () => useFormStore((state) => state);
export const useUserFormActions = () => useFormStore((state) => state.actions);
