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
