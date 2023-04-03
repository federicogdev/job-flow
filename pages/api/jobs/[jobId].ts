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
  if (req.method !== "PUT" && req.method !== "GET" && req.method !== "DELETE") {
    return res.status(405).end();
  }
  const { jobId } = req.query;

  if (req.method === "GET") {
    try {
      const { currentUser } = await serverAuth(req);

      if (!jobId || typeof jobId !== "string") {
        throw new Error("Invalid ID");
      }

      const job = await prisma.job.findUnique({ where: { id: jobId } });

      if (job?.userId !== currentUser.id) {
        throw new Error("Unauthorized");
      }

      return res.status(200).json(job);
    } catch (error) {
      return res.status(400).json({ error: `Something went wrong: ${error}` });
    }
  }

  if (req.method === "PUT") {
    try {
      const { company, location, position, status, type } = req.body;

      const { currentUser } = await serverAuth(req);

      if (!jobId || typeof jobId !== "string") {
        throw new Error("Invalid ID");
      }

      const job = await prisma.job.findUnique({ where: { id: jobId } });

      if (job?.userId !== currentUser.id) {
        throw new Error("Unauthorized");
      }

      const updatedJob = await prisma.job.update({
        where: { id: jobId },
        data: {
          company,
          location,
          position,
          status: status as JobStatus,
          type: type as JobType,
        },
      });
      return res.status(200).json(updatedJob);
    } catch (error) {
      return res.status(400).json({ error: `Something went wrong: ${error}` });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { currentUser } = await serverAuth(req);

      if (!jobId || typeof jobId !== "string") {
        throw new Error("Invalid ID");
      }

      const job = await prisma.job.findUnique({ where: { id: jobId } });

      if (job?.userId !== currentUser.id) {
        throw new Error("Unauthorized");
      }

      const deletedJob = await prisma.job.delete({ where: { id: jobId } });

      return res.status(200).json(deletedJob);
    } catch (error) {
      return res.status(400).json({ error: `Something went wrong: ${error}` });
    }
  }
}
