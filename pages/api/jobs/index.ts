import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";
import { JobStatus, JobType } from "@prisma/client";
import { number } from "zod";

type Sort = "desc" | "asc";

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
      const {
        status,
        type,
        page = "1",
        perPage = "10",
        sort = "desc",
      } = req.query;

      const jobs = await prisma.job.findMany({
        where: {
          userId: currentUser.id,
          status: status ? (status as JobStatus) : undefined,
          type: type ? (type as JobType) : undefined,
        },
        skip: (Number(page) - 1) * Number(perPage),
        take: Number(perPage),
        orderBy: { createdAt: sort as Sort },
      });

      const count = await prisma.job.count({
        where: {
          userId: currentUser.id,
          status: status ? (status as JobStatus) : undefined,
          type: type ? (type as JobType) : undefined,
        },
      });

      const pages = Math.ceil(count / Number(perPage));

      return res.status(200).json({ jobs, pages, count });
    }
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}
