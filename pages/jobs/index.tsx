import RecentApplicationCard from "@/components/Cards/RecentApplicationCard";
import Pagination from "@/components/Pagination";
import SortPanel from "@/components/SortPanel";
import { JobsContext } from "@/context/JobsContext";
import useJobs from "@/hooks/useJobs";
import { JobStatus, JobType } from "@prisma/client";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import React, { useContext, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import ReactPaginate from "react-paginate";

interface Props {}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const JobsPage = (props: Props) => {
  const {
    page,
    setPage,
    perPage,
    setPerPage,
    status,
    setStatus,
    setType,
    type,
    sort,
  } = useContext(JobsContext);

  const url = `/api/jobs?status=${status}&type=${type}&page=${page}&perPage=12&sort=${sort}`;
  const { data, isLoading, error, mutate } = useJobs(url);

  return (
    <div className="p-4 min-h-screen">
      <SortPanel />
      {/* <div>
          <select
            name=""
            id="status"
            onChange={(e) => setStatus(e.target.value as JobStatus)}
            value={status}
          >
            <option value="">All</option>
            <option value={JobStatus.INTERVIEW}>Interview</option>
            <option value={JobStatus.PENDING}>Pending</option>
            <option value={JobStatus.DECLINED}>Declined</option>
          </select>

          <select
            name=""
            id="type"
            onChange={(e) => setType(e.target.value as JobType)}
            value={type}
          >
            <option value="">All</option>
            <option value={JobType.FULL_TIME}>Full Time</option>
            <option value={JobType.INTERNSHIP}>Internship</option>
            <option value={JobType.PART_TIME}>Part Time</option>
            <option value={JobType.REMOTE}>Remote</option>
          </select>
        </div> */}

      {/* <div>page: {page}</div>
        <div>page: {data?.pages}</div>
        <div>page: {data?.count}</div> */}
      <div className="grid lg:grid-cols-3 gap-x-3 gap-y-1">
        {!!data?.jobs &&
          data?.jobs.length > 0 &&
          data.jobs.map((job) => <RecentApplicationCard job={job} />)}
      </div>

      <Pagination />
    </div>
  );
};

export default JobsPage;
