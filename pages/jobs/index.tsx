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
import { BarLoader } from "react-spinners";
import ClipLoader from "react-spinners/ClipLoader";

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
  const { page, status, type, sort } = useContext(JobsContext);

  const url = `/api/jobs?status=${status}&type=${type}&page=${page}&perPage=12&sort=${sort}`;
  const { data, isLoading, error, mutate } = useJobs(url);
  const showPagination = data?.jobs && data?.pages && data?.pages > 1;
  const showJobs = !!data?.jobs && data?.jobs.length > 0;
  return (
    <div className="p-4 min-h-screen">
      <SortPanel />
      {isLoading ? (
        <div className="h-full">
          <BarLoader
            color="red"
            // loading={loading}
            // size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-x-3 gap-y-1">
          {showJobs &&
            data.jobs.map((job) => <RecentApplicationCard job={job} />)}
        </div>
      )}

      {showPagination && (
        <Pagination pagesCount={data?.pages} count={data.count} />
      )}
    </div>
  );
};

export default JobsPage;
