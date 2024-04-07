import { axiosInstance } from "../utils//axiosHelper";

import { getTokenCookie, getAuthHeader } from "../utils/authTools";

export const loginUser = async (values) => {
  const response = await axiosInstance.post("/auth/signin", values);

  return response.data;
};

export const userIsAuth = async () => {
  if (!getTokenCookie()) {
    return false;
  } else {
    const response = await axiosInstance.get("/auth/isauth", getAuthHeader());

    return response.data;
  }
};

export const signOutUser = async () => {
  const response = await axiosInstance.get("/auth/logout", getAuthHeader());
  return response.data;
};
