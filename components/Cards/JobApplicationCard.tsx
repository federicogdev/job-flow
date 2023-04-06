import useJobApplicationEditModal from "@/hooks/useJobApplicationEditModal";
import useJobs from "@/hooks/useJobs";
import useOverview from "@/hooks/useOverview";
import useRecentJobs from "@/hooks/useRecentJobs";
import { getCompanyInitial, getStatusIcon } from "@/utils/icons";
import { Job, JobStatus } from "@prisma/client";
import { formatDistanceToNowStrict } from "date-fns";
import toast from "react-hot-toast";
import { CiLocationOn } from "react-icons/ci";
import {
  MdDangerous,
  MdEditCalendar,
  MdOutlineDelete,
  MdOutlineEdit,
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
  const { onOpen } = useJobApplicationEditModal();

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

  const onDelete = async () => {
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
      // onClick={() => onOpen(job.id)}
      className="border rounded-md my-3 p-2 bg-gray-100 dark:bg-zinc-900 border-gray-300 dark:border-zinc-800 cursor-pointer"
    >
      <div className="flex pb-1 items-center justify-between border-b bg-gray-100 dark:bg-zinc-900 border-gray-300 dark:border-zinc-800">
        <div className="flex">
          <div className="p-3 mr-2 rounded-md flex items-center justify-center text-white  dark:text-black bg-[#392061] dark:bg-[#DDC9B4]">
            {getCompanyInitial(job.company.charAt(0))}
          </div>
          <div>
            <p className="font-bold">{job.position}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {job.company}
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300">
          {formatDistanceToNowStrict(new Date(job.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
      <div className="pt-2 text-gray-700 dark:text-gray-400 flex flex-row justify-between items-center">
        <div className="flex flex-wrap">
          <div className="flex items-center">
            <CiLocationOn />
            <p className="ml-1">{job.location}</p>
          </div>

          <div className="flex items-center ml-2">
            {getStatusIcon(job.status)}
            <p className="ml-1">{job.status.toLowerCase()}</p>
          </div>

          <div className="flex items-center ml-2">
            <CiLocationOn />
            <p className="ml-1">{job.type.toLowerCase()}</p>
          </div>
        </div>

        <div className="flex text-[#392061] dark:text-[#DDC9B4]">
          <div
            className="text-sm flex items-center mr-2"
            onClick={() => onOpen(job.id)}
          >
            <MdOutlineEdit />
            Edit
          </div>
          <div className="text-sm flex items-center" onClick={onDelete}>
            <MdOutlineDelete /> Delete
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationCard;
