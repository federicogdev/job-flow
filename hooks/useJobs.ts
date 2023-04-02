import { fetcher } from "@/libs/fetcher";
import useSWR from "swr";
import { Job, JobStatus, JobType } from "@prisma/client";

type JobsResponse = {
  jobs: Job[];
  pages: number;
  count: number;
};

const useJobs = (key: string) => {
  const { data, error, isLoading, mutate } = useSWR<JobsResponse>(key, fetcher);

  return { data, error, isLoading, mutate };
};

export default useJobs;
