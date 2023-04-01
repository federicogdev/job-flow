import OverviewCard from "@/components/OverviewCard";
import useOverview from "@/hooks/useOverview";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { MdPendingActions, MdCalendarMonth, MdDangerous } from "react-icons/md";
import { BsFillCalendarCheckFill } from "react-icons/bs";
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

const index = (props: Props) => {
  const { data: overview, error, isLoading, mutate } = useOverview();
  return (
    <div className="min-h-screen">
      <div className="grid lg:grid-cols-3 gap-4 p-4">
        <OverviewCard
          label="Interview"
          value={overview?.interview}
          icon={MdCalendarMonth}
        />

        <OverviewCard
          label="Declined"
          value={overview?.declined}
          icon={MdDangerous}
        />

        <OverviewCard
          label="Pending"
          value={overview?.pending}
          icon={MdPendingActions}
        />
      </div>
      <div className="p-4 grid md:grid-cols-3 grid-cols-1 gap-4">
        <div>Chart</div>
        <div>List</div>
      </div>
    </div>
  );
};

export default index;
