import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import React from "react";

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

const ProfilePage = (props: Props) => {
  return <div>Profile</div>;
};

export default ProfilePage;
