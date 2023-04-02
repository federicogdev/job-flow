import { fetcher } from "@/libs/fetcher";
import useSWR from "swr";
import { Job, JobStatus, JobType } from "@prisma/client";

const useJobs = (key: string) => {
  const { data, error, isLoading, mutate } = useSWR<Job[]>(key, fetcher);

  return { data, error, isLoading, mutate };
};

export default useJobs;
