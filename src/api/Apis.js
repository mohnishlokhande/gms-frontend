import axios from "axios";
import { useEffect, useState } from "react";

const baseURL = "http://localhost:8080";

const useGetAPI = (endPoint, refetchCount = 1) => {
  const [data, setData] = useState(undefined);
  const [isLoading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

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
          // console.log("###a", value?.status);
          setData(value.data);
          setLoading(false);
        });
    }
  }, [refetchCount]);

  return { isLoading, data };
};

const usePostAPI = (config = {}) => {
  // const [data, setData] = useState(undefined);
  const [isLoading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const mutate = (payload) => {
    setLoading(true);
    axios
      .post(
        `${baseURL}/${config?.endPoint}`,
        { ...payload },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
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
