import { create } from "zustand";

//user
const accountStore = (set) => ({
  account: {},
  setAccount: (acc) => {
    set({ account: acc });
  },
});

export const useAccountStore = create(accountStore);

//users
const UsersStore = (set) => ({
  users: [],
  setUsers: (list) => {
    set({ users: list });
  },
});

export const useUsersStore = create(UsersStore);

const UserProfileStore = (set) => ({
  user: {},
  setUser: (obj) => {
    set({ user: obj });
  },
});

export const useUserProfileStore = create(UserProfileStore);

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
  gymCount: 1,
  refetchGyms: () => {
    set((state) => ({ gymCount: state.gymCount + 1 }));
  },
  membershipCount: 1,
  refetchMemberships: () => {
    set((state) => ({ membershipCount: state.membershipCount + 1 }));
  },
});

export const useRefetchStore = create(refetchStore);
