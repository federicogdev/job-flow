import useJobs from "@/hooks/useJobs";
import useOverview from "@/hooks/useOverview";
import useRecentJobs from "@/hooks/useRecentJobs";
import { Job, JobStatus } from "@prisma/client";
import { formatDistanceToNowStrict } from "date-fns";
import toast from "react-hot-toast";

import {
  MdDangerous,
  MdEditCalendar,
  MdPendingActions,
  MdQuestionMark,
} from "react-icons/md";

interface JobApplicationCardProps {
  job: Job;
}

const JobApplicationCard = ({ job }: JobApplicationCardProps) => {
  const { mutate: mutateOverview } = useOverview();
  const { mutate: mutateRecentJobs } = useRecentJobs();
  const { mutate: mutateAllJobs } = useJobs();

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

  const onClick = async () => {
    try {
      const response = await fetch(`/api/jobs/${job.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        toast.success("Successfully deleted a job!");
        mutateOverview();
        mutateRecentJobs();
        mutateAllJobs();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      // href={`/jobs/${job.id}`}
      className="border items-center justify-between rounded-md my-3 p-2 flex bg-gray-100 dark:bg-zinc-900 border-gray-300 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-800"
    >
      <div className="flex items-center">
        <div
          className={`
          p-1 rounded
          text-white
          ${job.status === "PENDING" ? "bg-sky-600" : ""} 
          ${job.status === "DECLINED" ? "bg-rose-600" : ""}
          ${job.status === "INTERVIEW" ? "bg-teal-600" : ""}
          `}
        >
          {renderIcon(job.status)}
        </div>
        <div className="pl-2">
          <p className="font-bold">{job.position}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {job.company}
          </p>
        </div>
      </div>
      <p className="lg:flex md:hidden text-sm text-gray-600 dark:text-gray-400">
        {formatDistanceToNowStrict(new Date(job.createdAt), {
          addSuffix: true,
        })}
      </p>
    </div>
  );
};

export default JobApplicationCard;
