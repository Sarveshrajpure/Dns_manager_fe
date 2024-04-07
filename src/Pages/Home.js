import React, { useState, useEffect } from "react";
import { getHostedZones } from "../Actions/HostedZonesActions";
import { toast } from "react-toastify";
import MetricsCard from "../Components/MetricsCard";
import TableComp from "../Components/TableComponent/TableComp";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [hostedZones, setHostedZones] = useState([]);
  const [totalHostedZones, setTotalHostedZones] = useState("");
  const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 25, 50];

  useEffect(() => {
    const listHostedZones = async () => {
      try {
        setLoading(true);
        let response = await getHostedZones();

        let records = response.map((item, index) => {
          return {
            ID: item.Id,
            Name: item.Name,
            Records: item.ResourceRecordSetCount,
          };
        });

        setHostedZones(records);
        setTotalHostedZones(response.length);
        setLoading(false);
      } catch (err) {
        toast.err("Error fetching domains - ", err.message);
      }
    };

    listHostedZones();
  }, []);

  const viewRecordsBtn = (props) => {
    console.log(props);
    return (
      <button
        className="bg-blue-500 hover:bg-blue-700
         text-white font-medium h-[2rem] mt-1  flex items-center rounded-md px-4"
        onClick={() => {
          console.log(props.data.ID);
          navigate("/dns", { state: { id: props.data.ID } });
        }}
      >
        View Records
      </button>
    );
  };

  const editDomainBtn = (props) => {
    return (
      <button
        className="bg-green-500 hover:bg-green-700
      text-white font-medium h-[2rem] mt-1  flex items-center rounded-md px-4 "
      >
        Edit Domain
      </button>
    );
  };

  const deleteDomainBtn = (props) => {
    return (
      <button
        className="bg-red-500 hover:bg-red-700
      text-white font-medium h-[2rem] mt-1  flex items-center rounded-md px-4 "
      >
        Delete Domain
      </button>
    );
  };
  const tableCols = [
    { field: "ID", flex: 1 },
    { field: "Name", flex: 1 },
    { field: "Records", flex: 1 },
    { field: "View Records", cellRenderer: viewRecordsBtn, flex: 1 },
    { field: "Edit Domain", cellRenderer: editDomainBtn, flex: 1 },
    { field: "Delete Domain", cellRenderer: deleteDomainBtn, flex: 1 },
  ];
  return (
    <div>
      <div className="hostedZoneMetricsWrapper mt-14 p-3 flex  items-center">
        <div className="w-4/12 text-xl font-medium">
          Welcome, {localStorage.getItem("userName")}
        </div>
        <div className="w-4/12 flex justify-center">
          <MetricsCard metric={totalHostedZones} displayText={"Total Hosted Zones"} />
        </div>
        <div className="w-4/12 flex justify-center">
          <button
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br
           focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800
           font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Create New Domain
          </button>
        </div>
      </div>
      <div className="hostedZonesTable">
        {loading ? (
          <div className=" flex justify-center w-full p-2 mt-10">
            <Oval color="#5063F0" height={40} width={40} />
          </div>
        ) : (
          <TableComp
            columnDefs={tableCols}
            rowData={hostedZones}
            pagination={pagination}
            paginationPageSize={paginationPageSize}
            paginationPageSizeSelector={paginationPageSizeSelector}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
