import { fetcher } from "@/libs/fetcher";
import useSWR from "swr";
import { Job } from "@prisma/client";

const useRecentJobs = () => {
  const { data, error, isLoading, mutate } = useSWR<Job[]>(
    "/api/jobs/recent",
    fetcher
  );

  return { data, error, isLoading, mutate };
};

export default useRecentJobs;
