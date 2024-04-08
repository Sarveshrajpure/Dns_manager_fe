import React, { useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Slide } from "react-awesome-reveal";
import { editHostedZoneSchema } from "../../Validations/hostedZoneValidations";
import { toast } from "react-toastify";
import { editHostedZone } from "../../Actions/HostedZonesActions";
import { Oval } from "react-loader-spinner";

const AddNewRecordModal = ({ open, setOpen, Id, setReload, domainName }) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(editHostedZoneSchema),
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (Id) {
        await editHostedZone({ Id, Comment: data.Comment });
        setLoading(false);
        toast.success("Domain Updated!");
        setReload((prev) => !prev);
        setOpen(false);
      }
    } catch (err) {
      toast.error("Error updating domain, something went wrong!");
      setOpen(false);
      setLoading(false);
    }
  };
  return (
    <>
      {open ? (
        <div
          className="modalBackground h-full w-full
     absolute top-0 left-0 flex justify-center items-center 
      z-10 backdrop-blur-md"
        >
          <Slide duration={400} direction="down">
            <div className="modalContainer  w-[30rem] bg-white shadow-md rounded-md border py-5">
              <div className="closeBtnContainer w-full flex justify-end px-5">
                <XCircleIcon
                  className="w-8 h-8 cursor-pointer"
                  onClick={() => {
                    setOpen(false);
                  }}
                />
              </div>

              <div className="modalHeader text-2xl font-medium text-center">Add Record</div>
              <div className="modalBody px-12 mt-10">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2" htmlFor="description">
                      Record Name
                    </label>
                    <div className="flex gap-1 items-center ">
                      <div className="w-4/5">
                        <input
                          className=" bg-gray-200 appearance-none border-2 border-gray-200 
                  rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none
                focus:bg-white focus:border-blue-700"
                          id="Name"
                          type="text"
                          placeholder="subdoamin"
                          {...register("Name")}
                        />
                      </div>

                      <div className="">{domainName}</div>
                    </div>

                    <label className="block text-[12px] mb-2" htmlFor="description">
                      Keep blank to create a record for the root domain.
                    </label>
                    {
                      <div
                        className="invalid-feedback  text-red-400 text-xs px-2 pt-1"
                        style={errors.Comment ? { display: "block" } : {}}
                      >
                        {errors.Comment?.message}
                      </div>
                    }
                  </div>
                  {loading ? (
                    <div className=" flex justify-center w-full p-2 mt-10">
                      <Oval color="#5063F0" height={40} width={40} />
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br
              focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800
              font-semibold rounded-md text-lg px-8 py-2.5 text-center me-2 mb-2"
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </form>
              </div>
              <div className="modalFooter"></div>
            </div>
          </Slide>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default AddNewRecordModal;
