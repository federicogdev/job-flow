import Chart from "@/components/Dashboard/Chart";
import RecentApplications from "@/components/Dashboard/RecentApplications";
import StatusOverviewPanel from "@/components/Dashboard/StatusOverviewPanel";
import useOverview from "@/hooks/useOverview";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

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

const HomePage = (props: Props) => {
  return (
    <div className="min-h-screen">
      <StatusOverviewPanel />
      <div className="p-4 grid lg:grid-cols-3 grid-cols-1 gap-4">
        <Chart />
        <RecentApplications />
      </div>
    </div>
  );
};

export default HomePage;
