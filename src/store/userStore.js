import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

//user
const accountStore = (set) => ({
  account: {},
  setAccount: (acc) => {
    set({ account: acc });
  },
});

export const useAccountStore = create(
  devtools(persist(accountStore, { name: "account" }))
);

//users
const UsersStore = (set) => ({
  users: [],
  setUsers: (list) => {
    set({ users: list });
  },
});

export const useUsersStore = create(
  devtools(persist(UsersStore, { name: "users" }))
);

//for refetch
const refetchStore = (set) => ({
  accountCount: 1,
  refetchAccount: () => {
    set((state) => ({ accountCount: state.accountCount + 1 }));
  },
  usersCount: 1,
  refetchUsers: () => {
    set((state) => ({ usersCount: state.usersCount + 1 }));
  },
});

export const useRefetchStore = create(refetchStore);
