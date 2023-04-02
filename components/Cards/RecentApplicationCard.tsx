import { Job, JobStatus } from "@prisma/client";
import { formatDistanceToNowStrict } from "date-fns";
import React from "react";

import {
  MdDangerous,
  MdEditCalendar,
  MdPendingActions,
  MdQuestionMark,
} from "react-icons/md";

interface RecentApplicationCardProps {
  job: Job;
}

const RecentApplicationCard = ({ job }: RecentApplicationCardProps) => {
  const renderIcon = (status: JobStatus) => {
    switch (status) {
      case "PENDING":
        return <MdPendingActions size={30} />;

      case "INTERVIEW":
        return <MdEditCalendar size={30} />;

      case "DECLINED":
        return <MdDangerous size={30} />;

      default:
        return <MdQuestionMark size={30} />;
    }
  };

  return (
    <div className="border items-center justify-between rounded-lg my-3 p-2 flex bg-gray-50 dark:bg-zinc-900 border-gray-300 dark:border-zinc-700">
      <div className="flex items-center">
        <div
          className={`
        p-3 rounded
        text-white
        ${job.status === "PENDING" ? "bg-blue-400" : ""} 
        ${job.status === "DECLINED" ? "bg-red-400" : ""}
        ${job.status === "INTERVIEW" ? "bg-green-400" : ""}
        `}
        >
          {renderIcon(job.status)}
        </div>
        <div className="pl-2">
          <p className="font-bold">{job.company}</p>
          <p className="text-sm text-gray-400">{job.position}</p>
        </div>
      </div>
      <p className="lg:flex md:hidden text-sm">
        {formatDistanceToNowStrict(new Date(job.createdAt), {
          addSuffix: true,
        })}
      </p>
    </div>
  );
};

export default RecentApplicationCard;
