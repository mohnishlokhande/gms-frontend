import axios from "axios";
import { useEffect, useState } from "react";
import {
  useGymsStore,
  useLeadsStore,
  useMembershipHistoryStore,
  useMembershipsStore,
} from "../store/secondaryStore";
import {
  useAccountStore,
  useUserProfileStore,
  useUsersStore,
} from "../store/userStore";

const baseURL = "http://localhost:8080";

const useGetAPI = (endPoint, type = undefined, refetchCount = 1) => {
  const [data, setData] = useState(undefined);
  const [isLoading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const updateUsers = useUsersStore((state) => state.setUsers);
  const updateGyms = useGymsStore((state) => state.setGyms);
  const updateMemberships = useMembershipsStore(
    (state) => state.setMemberships
  );
  const updateLeads = useLeadsStore((state) => state.setLeads);
  const updateAcc = useAccountStore((state) => state.setAccount);
  const updateUserProfile = useUserProfileStore((state) => state.setUser);
  const updateMemberHistory = useMembershipHistoryStore(
    (state) => state.setHistory
  );
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
              updateUsers(value.data.users);
              break;
            case "gyms":
              updateGyms(value.data.gyms);
              break;
            case "memberships":
              updateMemberships(value.data.memberships);
              break;
            case "leads":
              updateLeads(value.data.users);
              break;
            case "account":
              updateAcc(value.data);
              break;
            case "user":
              updateUserProfile(value.data);
              break;
            case "membershipHistory":
              updateMemberHistory(value.data.results);
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

export { useGetAPI, usePostAPI };
