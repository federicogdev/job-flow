import { JobsContext } from "@/context/JobsContext";
import { JobStatus, JobType } from "@prisma/client";
import React, { useContext } from "react";

interface Props {}
type Sort = "desc" | "asc";

const SortPanel = (props: Props) => {
  const { status, setStatus, sort, setSort, type, setType } =
    useContext(JobsContext);
  return (
    // STATUS
    <div className="flex flex-col md:flex-row gap-x-6   border p-4 rounded-lg bg-gray-50 dark:bg-zinc-900 border-gray-300 dark:border-zinc-700 mb-5 ">
      <div className="flex-col flex-1 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-gray-700 dark:text-gray-400 text-xs font-bold mb-2"
          htmlFor="status"
        >
          Status
        </label>
        <div className="relative">
          <select
            onChange={(e) => setStatus(e.target.value as JobStatus)}
            id="status"
            value={status}
            className="block appearance-none w-full bg-gray-200 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-gray-400 py-3 px-4 pr-8  rounded leading-tight focus:outline-none"
          >
            <option value="">All</option>
            <option value={JobStatus.PENDING}>Pending</option>
            <option value={JobStatus.INTERVIEW}>Interview</option>
            <option value={JobStatus.DECLINED}>Declined</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-400">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* TYPE */}
      <div className="flex-col flex-1 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-gray-700 dark:text-gray-400 text-xs font-bold mb-2"
          htmlFor="type"
        >
          Type
        </label>
        <div className="relative">
          <select
            value={type}
            onChange={(e) => setType(e.target.value as JobType)}
            id="type"
            className="block appearance-none w-full bg-gray-200 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-gray-400 py-3 px-4 pr-8  rounded leading-tight focus:outline-none"
          >
            <option value="">All</option>
            <option value={JobType.FULL_TIME}>Full Time</option>
            <option value={JobType.PART_TIME}>Part Time</option>
            <option value={JobType.REMOTE}>Remote</option>
            <option value={JobType.INTERNSHIP}>Internship</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-400">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* SORT */}
      <div className="flex-col flex-1 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-gray-700 dark:text-gray-400 text-xs font-bold mb-2"
          htmlFor="sort"
        >
          Order by
        </label>
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            id="sort"
            className="block appearance-none w-full bg-gray-200 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-gray-400 py-3 px-4 pr-8  rounded leading-tight focus:outline-none"
          >
            <option value="desc">Recent</option>
            <option value="asc">Oldest</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-400">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex items-end">
        <button
          className="p-3 bg-[#9E2A2B] w-full rounded-lg font-bold hover:opacity-80
          "
          onClick={() => {
            setType("");
            setStatus("");
            setSort("desc");
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default SortPanel;
