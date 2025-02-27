import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UserFilterState {
  search: string;
  setSearch: (search: string) => void;
}

export const useUserFilterStore = create<UserFilterState>()(
  devtools(
    persist(
      (set) => ({
        search: '',
        setSearch: (search) => set({ search }),
      }),
      { name: 'user_filter_store' },
    ),
  ),
);
