import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getDnsRecordsMetrics, ListDnsRecords } from "../Actions/DnsActions";
import { toast } from "react-toastify";
import MetricsCard from "../Components/MetricsCard";
import { Oval } from "react-loader-spinner";

const DnsRecords = () => {
  const location = useLocation();
  const id = location.state.id.split("/")[2];
  const [loadingMetrics, setLoadingMetrics] = useState(false);
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    const getMetrics = async () => {
      try {
        setLoadingMetrics(true);
        let response = await getDnsRecordsMetrics(id);
        setMetrics(response);
        setLoadingMetrics(false);
      } catch (err) {
        toast.error("Error fetching metrics - ", err.message);
      }
    };
    getMetrics();

    const listDnsRecords = async () => {
      try {
      } catch (err) {}
    };

    listDnsRecords();
  }, [id]);

  return (
    <div className="mt-14">
      <div className="text-center text-xl font-semibold p-5">DNS Records Metrics</div>
      {loadingMetrics ? (
        <div className=" flex justify-center w-full p-2 mt-10">
          <Oval color="#5063F0" height={40} width={40} />
        </div>
      ) : (
        <div className="flex flex-wrap justify-around">
          {metrics.map((item) => (
            <MetricsCard metric={item.count} displayText={item.recordType} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DnsRecords;
