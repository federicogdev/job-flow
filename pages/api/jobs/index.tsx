import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";
import { JobStatus, JobType } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    const { currentUser } = await serverAuth(req);

    if (req.method === "POST") {
      const { company, location, position, status, type } = req.body;
      const job = await prisma.job.create({
        data: {
          company,
          location,
          position,
          status: status as JobStatus,
          type: type as JobType,
          userId: currentUser.id,
        },
      });

      return res.status(200).json(job);
    }

    if (req.method === "GET") {
      const jobs = await prisma.job.findMany({
        where: { userId: currentUser.id },
        orderBy: { createdAt: "desc" },
      });

      return res.status(200).json(jobs);
    }
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}
