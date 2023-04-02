import prisma from "@/libs/prisma";
import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    const { currentUser } = await serverAuth(req);

    const recentJobs = await prisma.job.findMany({
      where: { userId: currentUser.id },
      take: 7,
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json(recentJobs);
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}
