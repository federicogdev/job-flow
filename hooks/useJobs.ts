import { fetcher } from "@/libs/fetcher";
import useSWR from "swr";
import { Job, JobStatus, JobType } from "@prisma/client";
import { JobsContext } from "@/context/JobsContext";
import { useContext } from "react";

type JobsResponse = {
  jobs: Job[];
  pages: number;
  count: number;
};

const useJobs = () => {
  const { page, perPage, status, type, sort } = useContext(JobsContext);
  const url = `/api/jobs?status=${status}&type=${type}&page=${page}&perPage=10&sort=${sort}`;

  const { data, error, isLoading, mutate } = useSWR<JobsResponse>(url, fetcher);

  return { data, error, isLoading, mutate };
};

export default useJobs;
