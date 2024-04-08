import { axiosInstance } from "../utils/axiosHelper";

import { getAuthHeader } from "../utils/authTools";

export const getHostedZones = async () => {
  let response = await axiosInstance.get("/hostedzone/list", getAuthHeader());

  return response.data;
};

export const createHostedZone = async (values) => {
  let response = await axiosInstance.post("/hostedzone/create", values, getAuthHeader());

  return response.data;
};

export const editHostedZone = async (values) => {
  let response = await axiosInstance.put("/hostedzone/update", values, getAuthHeader());

  return response.data;
};

export const deleteHostedZone = async (values) => {
  let response = await axiosInstance.delete(`/hostedzone/delete/${values}`, getAuthHeader());

  return response.data;
};
