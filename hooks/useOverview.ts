import useSwr from "swr";
import { fetcher } from "@/libs/fetcher";
import useSWR from "swr";
import { Job } from "@prisma/client";

type OverviewResponse = {
  declined: number;
  pending: number;
  interview: number;
  byDay: {
    [key: string]: {
      pending: number;
      interview: number;
      declined: number;
    };
  };
};

const useOverview = () => {
  const { data, error, isLoading, mutate } = useSWR<OverviewResponse>(
    "/api/overview",
    fetcher
  );

  return { data, error, isLoading, mutate };
};

export default useOverview;
