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

//leads
const LeadsStore = (set) => ({
  leads: [],
  setLeads: (list) => {
    set({ users: list });
  },
});

export const useLeadsStore = create(LeadsStore);

//leads
const membershipHistory = (set) => ({
  history: [],
  setHistory: (list) => {
    set({ history: list });
  },
});

export const useMembershipHistoryStore = create(membershipHistory);
