import axios from "axios";
import { useEffect, useState } from "react";
import {
  useGymsStore,
  useLeadsStore,
  useMembershipHistoryStore,
  useMembershipsStore,
  useSettingsStore,
} from "../store/secondaryStore";
import {
  useAccountStore,
  useUserProfileStore,
  useUsersStore,
} from "../store/userStore";

const baseURL = import.meta.env.VITE_API_URL;

const useGetAPI = (endPoint, type = undefined, refetchCount = 1) => {
  const [data, setData] = useState(undefined);
  const [isLoading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const setUsers = useUsersStore((state) => state.setUsers);
  const setGyms = useGymsStore((state) => state.setGyms);
  const setMemberships = useMembershipsStore((state) => state.setMemberships);
  const setLeads = useLeadsStore((state) => state.setLeads);
  const setAcc = useAccountStore((state) => state.setAccount);
  const setUserProfile = useUserProfileStore((state) => state.setUser);
  const setMemberHistory = useMembershipHistoryStore(
    (state) => state.setHistory
  );
  const setSettings = useSettingsStore((state) => state.setSettings);

  useEffect(() => {
    if (token) {
      setLoading(true);
      axios
        .get(`${baseURL}/${endPoint}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((value) => {
          switch (type) {
            case "users":
              setUsers(value.data.users);
              break;
            case "gyms":
              setGyms(value.data.gyms);
              break;
            case "memberships":
              setMemberships(value.data.memberships);
              break;
            case "leads":
              setLeads(value.data.users);
              break;
            case "account":
              setAcc(value.data);
              break;
            case "user":
              setUserProfile(value.data);
              break;
            case "membershipHistory":
              setMemberHistory(value.data.results);
              break;
            case "settings":
              setSettings(value.data);
              break;
          }
          setData(value.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          if (error?.response?.status === 401 && endPoint === "user") {
            localStorage.clear();
            window?.location?.reload();
          }
        });
    }
  }, [refetchCount, endPoint]);

  return { isLoading, data };
};

const usePostAPI = (config = {}) => {
  const [isLoading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const { method = "post" } = config;

  const mutate = (payload) => {
    setLoading(true);

    axios({
      method: method,
      url: `${baseURL}/${config?.endPoint}`,
      data: { ...payload },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((value) => {
        config?.onSuccess(value);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        config?.onError(error?.response);
      });
  };
  return { mutate, isLoading };
};

const usePostAPIWithoutAuth = (config = {}) => {
  const [isLoading, setLoading] = useState(false);
  const { method = "post", token = "" } = config;

  const mutate = (payload) => {
    setLoading(true);

    let apiConfig = {
      method: method,
      url: `${baseURL}/${config?.endPoint}`,
      data: { ...payload },
    };
    if (token !== "") {
      apiConfig = {
        ...apiConfig,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }

    axios(apiConfig)
      .then((value) => {
        config?.onSuccess(value);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        config?.onError(error?.response);
      });
  };
  return { mutate, isLoading };
};

export { useGetAPI, usePostAPI, usePostAPIWithoutAuth };
