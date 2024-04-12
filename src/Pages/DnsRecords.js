import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getDnsRecordsMetrics, listDnsRecords, deleteDnsRecord } from "../Actions/DnsActions";
import { toast } from "react-toastify";
import MetricsCard from "../Components/MetricsCard";
import { Oval } from "react-loader-spinner";
import TableComp from "../Components/TableComponent/TableComp";
import AddNewRecordModal from "../Components/Modals/AddNewRecordModal";
import DeleteModal from "../Components/Modals/DeleteModal";

const DnsRecords = () => {
  const location = useLocation();
  const id = location.state.id.split("/")[2];
  const domainName = location.state.domainName;
  const [loadingMetrics, setLoadingMetrics] = useState(false);
  const [loadingRecords, setLoadingRecords] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [currentRecord, setCurrentRecord] = useState("");
  const [metrics, setMetrics] = useState([]);
  const [dnsRecords, setDnsRecords] = useState([]);
  const [reload, setReload] = useState(false);
  const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 25, 50];

  console.log(domainName);

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

    const getDnsRecords = async () => {
      try {
        setLoadingRecords(true);

        let response = await listDnsRecords(id);

        let records = response?.ResourceRecordSets.map((item) => {
          return { Name: item.Name, Type: item.Type, Value: item.ResourceRecords };
        });

        console.log(records);
        setDnsRecords(records);
        setLoadingRecords(false);
      } catch (err) {
        toast.error("Error fetching records", err.message);
      }
    };

    getDnsRecords();
  }, [id, reload]);

  const renderValues = (props) => {
    console.log(props);
    return (
      <div>
        {props.data.Value?.map((item, index) => (
          <div key={index}>{item.Value}</div>
        ))}
      </div>
    );
  };

  const editRecordBtn = (props) => {
    return (
      <div className="flex items-center h-full">
        <button
          className="bg-green-500 hover:bg-green-700
    text-white font-medium h-[2rem] mt-1  flex items-center rounded-md px-4"
        >
          Edit Record
        </button>
      </div>
    );
  };

  const deleteRecordBtn = (props) => {
    console.log(props);
    return (
      <div className="flex items-center h-full">
        <button
          className="bg-red-500 hover:bg-red-700
    text-white font-medium h-[2rem] mt-1  flex items-center rounded-md px-4 "
          onClick={() => {
            setOpenDelete(true);
            setCurrentRecord(props.data);
          }}
        >
          Delete Record
        </button>
      </div>
    );
  };

  const tableCols = [
    { field: "Name", flex: 1, filter: true, floatingFilter: true },
    { field: "Type", flex: 1, filter: true, floatingFilter: true },
    {
      field: "Value",
      flex: 1,
      cellRenderer: renderValues,
      autoHeight: true,
      filter: true,
      floatingFilter: true,
    },
    { field: "Edit Domain", cellRenderer: editRecordBtn, flex: 1 },
    { field: "Delete Domain", cellRenderer: deleteRecordBtn, flex: 1 },
  ];

  const deleteRecord = async () => {
    try {
      setLoadingDelete(true);
      if (currentRecord) {
        console.log(currentRecord);
        let recordToBeDeleted = {
          ChangeBatch: {
            Changes: [
              {
                ResourceRecordSet: {
                  Name: currentRecord.Name,
                  Type: currentRecord.Type,
                  ResourceRecords: [{ Value: currentRecord.Value[0]?.Value }],
                  TTL: "3000",
                },
              },
            ],
          },
          HostedZoneId: id,
        };

        await deleteDnsRecord(recordToBeDeleted);
        setLoadingDelete(false);
        setOpenDelete(false);
        setReload((prev) => !prev);
        toast.success("Record deleted!");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error deleting record", err.message);
      setLoadingDelete(false);
    }
  };

  return (
    <div className="mt-14">
      <div className="w-full flex justify-between items-center">
        <div className="w-4/12"></div>
        <div className="text-center w-4/12 text-xl font-semibold p-4 flex justify-center">
          DNS Records Metrics{" "}
        </div>
        <div className="w-4/12 flex justify-end">
          <button
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br
           focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800
           font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2 mr-5"
            onClick={() => setOpenAdd(true)}
          >
            Add New Record
          </button>
        </div>
      </div>
      {loadingMetrics ? (
        <div className=" flex justify-center w-full p-2 mt-10">
          <Oval color="#5063F0" height={40} width={40} />
        </div>
      ) : (
        <div className="flex flex-wrap justify-around">
          {metrics.map((item) => (
            <MetricsCard metric={item.count} displayText={item.recordType} key={item.recordType} />
          ))}
        </div>
      )}

      <div className="hostedZonesTable mt-5">
        {loadingRecords ? (
          <div className=" flex justify-center w-full p-2 mt-10">
            <Oval color="#5063F0" height={40} width={40} />
          </div>
        ) : (
          <TableComp
            columnDefs={tableCols}
            rowData={dnsRecords}
            pagination={pagination}
            paginationPageSize={paginationPageSize}
            paginationPageSizeSelector={paginationPageSizeSelector}
          />
        )}
      </div>

      <AddNewRecordModal
        open={openAdd}
        setOpen={setOpenAdd}
        Id={id}
        setReload={setReload}
        domainName={domainName}
      />

      <DeleteModal
        open={openDelete}
        setOpen={setOpenDelete}
        title={"Delete Record"}
        secondaryText={`Record to be deleted - ${currentRecord.Name} `}
        funcToBeCalledOnConfirm={deleteRecord}
      />
    </div>
  );
};

export default DnsRecords;
