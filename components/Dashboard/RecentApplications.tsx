import useRecentJobs from "@/hooks/useRecentJobs";
import Link from "next/link";
import RecentApplicationCard from "../Cards/RecentApplicationCard";

interface Props {}

const RecentApplications = (props: Props) => {
  const { data } = useRecentJobs();

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-bold">Recent Job Applications</h1>

        <Link href="jobs">
          <p className="text-gray-400">See More...</p>
        </Link>
      </div>
      <div>
        {!!data?.jobs &&
          data?.jobs.length > 0 &&
          data?.jobs.map((job) => <RecentApplicationCard job={job} />)}
      </div>
    </div>
  );
};

export default RecentApplications;
