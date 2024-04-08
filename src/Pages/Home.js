import React, { useState, useEffect } from "react";
import { getHostedZones, deleteHostedZone } from "../Actions/HostedZonesActions";
import { toast } from "react-toastify";
import MetricsCard from "../Components/MetricsCard";
import TableComp from "../Components/TableComponent/TableComp";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import EditHostedZoneModal from "../Components/Modals/EditHostedZoneModal";
import DeleteModal from "../Components/Modals/DeleteModal";
import AddNewDomainModal from "../Components/Modals/AddNewDomainModal";
const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [hostedZones, setHostedZones] = useState([]);
  const [totalHostedZones, setTotalHostedZones] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [currentDomainName, setCurrentDomainName] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [reload, setReload] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
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
            Description: item.Config.Comment,
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
  }, [reload]);

  const viewRecordsBtn = (props) => {
    console.log(props);
    return (
      <button
        className="bg-blue-500 hover:bg-blue-700
         text-white font-medium h-[2rem] mt-1  flex items-center rounded-md px-4"
        onClick={() => {
          navigate("/dns", { state: { id: props.data.ID, domainName: props.data.Name } });
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
      text-white font-medium h-[2rem] mt-1  flex items-center rounded-md px-4"
        onClick={() => {
          setOpenEdit(true);
          setCurrentId(props.data.ID);
        }}
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
        onClick={() => {
          setOpenDelete(true);
          setCurrentId(props.data.ID);
          setCurrentDomainName(props.data.Name);
        }}
      >
        Delete Domain
      </button>
    );
  };
  const tableCols = [
    { field: "ID", flex: 1, filter: true, floatingFilter: true },
    { field: "Name", flex: 1, filter: true, floatingFilter: true },
    { field: "Description", flex: 1, filter: true, floatingFilter: true },
    { field: "Records", flex: 1, filter: true, floatingFilter: true },
    { field: "View Records", cellRenderer: viewRecordsBtn, flex: 1 },
    { field: "Edit Domain", cellRenderer: editDomainBtn, flex: 1 },
    { field: "Delete Domain", cellRenderer: deleteDomainBtn, flex: 1 },
  ];

  const deleteHostedZoneOnConfirm = async (Id) => {
    try {
      setDeleteLoading(true);
      console.log("id", Id);
      if (Id !== "Z05444792XHV6FTID3O4S") {
        await deleteHostedZone(Id);
        setReload((prev) => !prev);
        setOpenDelete(false);
        toast.success("Domain Deleted!");
      } else {
        setOpenDelete(false);
        toast.error("Cannot delete this domain - It is currently in use!");
      }

      setDeleteLoading(false);
    } catch (err) {
      toast.error("Error deleting domain - ", err.message);
      setDeleteLoading(false);
    }
  };
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
            onClick={() => setOpenAdd(true)}
          >
            Add New Domain
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
      <EditHostedZoneModal
        open={openEdit}
        setOpen={setOpenEdit}
        Id={currentId}
        setReload={setReload}
      />
      <DeleteModal
        open={openDelete}
        setOpen={setOpenDelete}
        Id={currentId}
        loading={deleteLoading}
        title={"Delete Hosted Zone"}
        secondaryText={`Domain to be deleted - ${currentDomainName}`}
        funcToBeCalledOnConfirm={(Id) => deleteHostedZoneOnConfirm(Id)}
      />

      <AddNewDomainModal open={openAdd} setOpen={setOpenAdd} setReload={setReload} />
    </div>
  );
};

export default Home;
