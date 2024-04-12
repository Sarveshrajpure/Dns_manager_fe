import { axiosInstance } from "../utils/axiosHelper";

import { getAuthHeader } from "../utils/authTools";

export const getDnsRecordsMetrics = async (value) => {
  let response = await axiosInstance.get(
    `dns/getdnsrecordmetrics/?HostedZoneId=${value}`,
    getAuthHeader()
  );

  return response.data;
};

export const listDnsRecords = async (value) => {
  let response = await axiosInstance.get(
    `/dns/listdnsrecords/?HostedZoneId=${value}`,
    getAuthHeader()
  );

  return response.data;
};

export const createDnsRecord = async (values) => {
  let response = await axiosInstance.post("/dns/create", values, getAuthHeader());

  return response.data;
};

export const deleteDnsRecord = async (values) => {
  let response = await axiosInstance.post("dns/delete", values, getAuthHeader());

  return response.data;
};
