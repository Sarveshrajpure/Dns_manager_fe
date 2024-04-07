import React from "react";
import CountUp from "react-countup";

const MetricsCard = ({ metric, displayText }) => {
  return (
    <div className="px-4 py-2 bg-white  rounded-md shadow-md items-center ">
      <div className="text-2xl font-semibold ">
        <CountUp end={metric} duration={2} />
      </div>
      <div className="text-lg font-medium w-[8rem] whitespace-nowrap overflow-x-hidden text-ellipsis">
        {displayText}
      </div>
    </div>
  );
};

export default MetricsCard;
