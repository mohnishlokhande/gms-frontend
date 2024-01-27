import { create } from "zustand";

const GymsStore = (set) => ({
  gyms: [],
  setGyms: (list) => {
    set({ gyms: list });
  },
});

export const useGymsStore = create(GymsStore);
