import useJobs from "@/hooks/useJobs";
import useOverview from "@/hooks/useOverview";
import useRecentJobs from "@/hooks/useRecentJobs";
import Link from "next/link";
import React from "react";
import RecentApplicationCard from "../Cards/RecentApplicationCard";

interface Props {}

const RecentApplications = (props: Props) => {
  const { data: recentJobs = [] } = useRecentJobs();

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-bold">Recent Job Applications</h1>

        <Link href="jobs">
          <p className="text-gray-400">See More...</p>
        </Link>
      </div>
      <div>
        {!!recentJobs &&
          recentJobs.length > 0 &&
          recentJobs.map((job) => <RecentApplicationCard job={job} />)}
      </div>
    </div>
  );
};

export default RecentApplications;
