import { fetcher } from "@/libs/fetcher";
import useSWR from "swr";
import { Job, JobStatus, JobType } from "@prisma/client";

type RecentJobsResponse = {
  jobs?: Job[];
  pages?: number;
  count?: number;
};

const useRecentJobs = () => {
  const { data, error, isLoading, mutate } = useSWR<RecentJobsResponse>(
    "/api/jobs?page=1&perPage=7",
    fetcher
  );

  return { data, error, isLoading, mutate };
};

export default useRecentJobs;
