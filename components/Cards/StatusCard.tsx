import React from "react";
import { IconType } from "react-icons";

interface Props {
  label: string;
  value?: string | number;
  icon: IconType;
  status: "pending" | "declined" | "interview";
}

const StatusCard = ({ label, value = 0, icon: Icon, status }: Props) => {
  return (
    <div className="col-span-1 flex justify-between w-full border p-4 rounded-lg items-center bg-gray-50 dark:bg-zinc-900 border-gray-300 dark:border-zinc-700 ">
      <div className="flex flex-col w-full">
        <p className="text-xl font-bold">{label}</p>
        <p className="text-gray-600">{value}</p>
      </div>
      {/* <div className="bg-orange-400flex justify-center items-center p-2 rounded-lg text-white"> */}
      <div
        className={`
    ${status === "pending" ? "bg-blue-400" : ""} 
    ${status === "declined" ? "bg-red-400" : ""}
    ${status === "interview" ? "bg-green-400" : ""}
    flex justify-center items-center p-2 rounded-lg text-white
    `}
      >
        <Icon size={40} />
      </div>
    </div>
  );
};

export default StatusCard;
