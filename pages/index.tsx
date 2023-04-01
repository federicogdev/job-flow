import { JobStatus, JobType } from "@prisma/client";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import React, { use, useState } from "react";

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
  return <div></div>;
};

export default index;
