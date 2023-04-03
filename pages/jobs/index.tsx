import JobApplicationCard from "@/components/Cards/JobApplicationCard";
import RecentApplicationCard from "@/components/Cards/RecentApplicationCard";
import Pagination from "@/components/Pagination";
import SortPanel from "@/components/SortPanel";
import { JobsContext } from "@/context/JobsContext";
import useJobs from "@/hooks/useJobs";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useContext } from "react";
import { BarLoader } from "react-spinners";

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
  const { perPage } = useContext(JobsContext);

  const { data, isLoading, error, mutate } = useJobs();
  const showPagination = data?.jobs && data?.pages && data?.pages > 1;
  const showJobs = !!data?.jobs && data?.jobs.length > 0;
  return (
    <div className="p-4 min-h-screen">
      <SortPanel />
      {isLoading ? (
        <div className="h-full">
          <BarLoader
            color="red"
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-1">
          {showJobs && data.jobs.map((job) => <JobApplicationCard job={job} />)}
        </div>
      )}

      {showPagination && (
        <Pagination
          pagesCount={data?.pages}
          count={data.count}
          perPage={perPage}
        />
      )}
    </div>
  );
};

export default JobsPage;
