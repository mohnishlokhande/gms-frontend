import { create } from "zustand";

const GymsStore = (set) => ({
  gyms: [],
  setGyms: (list) => {
    set({ gyms: list });
  },
});

export const useGymsStore = create(GymsStore);

const MembershipsStore = (set) => ({
  memberships: [],
  setMemberships: (list) => {
    set({ memberships: list });
  },
});

export const useMembershipsStore = create(MembershipsStore);
