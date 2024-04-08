import React, { useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { Slide } from "react-awesome-reveal";
import { Oval } from "react-loader-spinner";

const DeleteModal = ({
  open,
  setOpen,
  Id,
  loading,
  title,
  secondaryText,
  funcToBeCalledOnConfirm,
}) => {
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

              <div className="modalHeader text-2xl font-medium text-center">{title}</div>
              <div className="modalBody px-12 text-center mt-5">
                <div className="text-2xl font-medium text-red-600">Are you sure?</div>
                <div className="mt-2 text-md font-medium">{secondaryText}</div>
              </div>
              <div className="modalFooter flex justify-center mt-5">
                {loading ? (
                  <div className=" flex justify-center w-full">
                    <Oval color="#5063F0" height={40} width={40} />
                  </div>
                ) : (
                  <button
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 
                  focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                   dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    onClick={() => {
                      funcToBeCalledOnConfirm(Id?.split("/")[2]);
                    }}
                  >
                    Confirm
                  </button>
                )}
              </div>
            </div>
          </Slide>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default DeleteModal;
