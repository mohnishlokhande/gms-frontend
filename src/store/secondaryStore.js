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
    set({ leads: list });
  },
});

export const useLeadsStore = create(LeadsStore);

//history
const membershipHistory = (set) => ({
  history: [],
  setHistory: (list) => {
    set({ history: list });
  },
});

export const useMembershipHistoryStore = create(membershipHistory);

const settingsStore = (set) => ({
  settings: {
    automaticBirthdayWishesSms: false,
    automaticMarriageAnniversaryWishesSms: false,
    automaticMembershipAnniversaryWishesSms: false,
    automaticExpirySevenDaySms: false,
    automaticExpiryBeforeDaySms: false,
    automaticBirthdayWishesEmail: false,
    automaticMarriageAnniversaryWishesEmail: false,
    automaticMembershipAnniversaryWishesEmail: false,
    automaticExpirySevenDayEmail: false,
    automaticExpiryBeforeDayEmail: false,
    automaticBirthdayWishesWa: false,
    automaticMarriageAnniversaryWishesWa: false,
    automaticMembershipAnniversaryWishesWa: false,
    automaticExpirySevenDayWa: false,
    automaticExpiryBeforeDayWa: false,
  },
  isEdit: false,
  updateSettings: (key) => {
    set((state) => ({
      settings: { ...state.settings, [key]: !state.settings[key] },
      isEdit: true,
    }));
  },
  setSettings: (obj) => {
    set({ settings: obj, isEdit: false });
  },
});

export const useSettingsStore = create(settingsStore);
