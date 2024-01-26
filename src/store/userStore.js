import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const accountStore = (set) => ({
  account: {},
  setAccount: (acc) => {
    set({ account: acc });
  },
});

export const useAccountStore = create(
  devtools(persist(accountStore, { name: "account" }))
);
