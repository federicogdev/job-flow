import { fetcher } from "@/libs/fetcher";
import { Job } from "@prisma/client";
import useSWR from "swr";

const useJob = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR<Job>(
    `/api/jobs/${id}`,
    fetcher
  );

  return { data, error, isLoading, mutate };
};

export default useJob;
