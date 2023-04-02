import RecentApplicationCard from "@/components/Cards/RecentApplicationCard";
import useJobs from "@/hooks/useJobs";
import { JobStatus, JobType } from "@prisma/client";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import React, { useState } from "react";

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
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [status, setStatus] = useState<JobStatus | "">("");
  const [type, setType] = useState<JobType | string>("");
  const url = `/api/jobs?status=${status}&type=${type}&page=${page}&perPage=${perPage}`;
  const { data, isLoading, error, mutate } = useJobs(url);

  return (
    <div>
      <div>
        <div>
          <select
            name=""
            id="status"
            onChange={(e) => setStatus(e.target.value as JobStatus)}
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
          >
            <option value="">All</option>
            <option value={JobType.FULL_TIME}>Full Time</option>
            <option value={JobType.INTERNSHIP}>Internship</option>
            <option value={JobType.PART_TIME}>Part Time</option>
            <option value={JobType.REMOTE}>Remote</option>
          </select>
        </div>

        <div>page: {data?.pages}</div>
        <div>page: {data?.count}</div>
      </div>
      {!!data?.jobs &&
        data?.jobs.length > 0 &&
        data.jobs.map((job) => <RecentApplicationCard job={job} />)}
    </div>
  );
};

export default JobsPage;
