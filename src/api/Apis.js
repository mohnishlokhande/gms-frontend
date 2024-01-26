import axios from "axios";
import { useEffect, useState } from "react";

const baseURL = "http://localhost:8080";

const useGetAPI = (endPoint) => {
  const [data, setData] = useState(undefined);
  const [isLoading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
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
  }, []);

  return { isLoading, data };
};

const usePostAPI = (endPoint, payload) => {
  const [data, setData] = useState(undefined);
  const [isLoading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setLoading(true);
    axios
      .post(
        `${baseURL}/${endPoint}`,
        { ...payload },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      // .then((value) => value.json())
      .then((value) => {
        setData(value);
        setLoading(false);
      });
  }, []);
  return [isLoading, data];
};

export { useGetAPI, usePostAPI };
