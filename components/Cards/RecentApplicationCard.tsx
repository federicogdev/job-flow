import { Job, JobStatus } from "@prisma/client";
import { formatDistanceToNowStrict } from "date-fns";
import Link from "next/link";
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
    <Link
      href={`/jobs/${job.id}`}
      className="border items-center justify-between rounded-lg my-3 p-2 flex bg-gray-50 dark:bg-zinc-900 border-gray-300 dark:border-zinc-700"
    >
      <div className="flex items-center">
        <div
          className={`
          p-1 rounded
          text-white
          ${job.status === "PENDING" ? "bg-blue-600" : ""} 
          ${job.status === "DECLINED" ? "bg-red-600" : ""}
          ${job.status === "INTERVIEW" ? "bg-green-600" : ""}
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
    </Link>
  );
};

export default RecentApplicationCard;
