import { useState } from "react";

export const REQUEST_STATUS = {
  SUCCESS: "success",
  ERROR: "error",
  LOADING: "loading",
  IDLE: "idle",
};

export const useFetch = ({ defaultVal, handle }) => {
  const [info, setInfo] = useState(defaultVal);
  const [status, setStatus] = useState("idle");

  const getData = async (...args) => {
    try {
      setStatus(REQUEST_STATUS.LOADING);
      const response = await handle(...args);
      setInfo(response);
      setStatus(REQUEST_STATUS.SUCCESS);
    } catch {
      setStatus(REQUEST_STATUS.ERROR);
    }
  };

  return {
    info,
    status,
    getData,
  };
};
