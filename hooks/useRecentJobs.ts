import { fetcher } from "@/libs/fetcher";
import useSWR from "swr";
import { Job, JobStatus, JobType } from "@prisma/client";

const useRecentJobs = () => {
  const { data, error, isLoading, mutate } = useSWR<Job[]>(
    "/api/jobs?page=1&perPage=7",
    fetcher
  );

  return { data, error, isLoading, mutate };
};

export default useRecentJobs;
