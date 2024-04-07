import { axiosInstance } from "../utils/axiosHelper";

import { getAuthHeader } from "../utils/authTools";

export const getHostedZones = async () => {
  let response = await axiosInstance.get("/hostedzone/list", getAuthHeader());

  return response.data;
};
