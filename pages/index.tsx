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

const index = (props: Props) => {
  const { data: overview, error, isLoading, mutate } = useOverview();
  return <div className="min-h-screen"></div>;
};

export default index;
