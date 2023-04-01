import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";
import { JobStatus, JobType } from "@prisma/client";
import { format, parseISO } from "date-fns";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    const { currentUser } = await serverAuth(req);

    const jobs = await prisma.job.findMany({
      where: { userId: currentUser.id },
    });

    const jobsByMonth: Record<string, number> = {};

    for (const job of jobs) {
      const month = format(job.createdAt, "MMMM yyyy");

      if (!jobsByMonth[month]) {
        jobsByMonth[month] = 0;
      }

      jobsByMonth[month] += 1;
    }

    const declinedJobs = await prisma.job.count({
      where: { userId: currentUser.id, status: JobStatus.DECLINED },
    });

    const pendingJobs = await prisma.job.count({
      where: { userId: currentUser.id, status: JobStatus.PENDING },
    });

    const interviewJobs = await prisma.job.count({
      where: { userId: currentUser.id, status: JobStatus.INTERVIEW },
    });

    return res.status(200).json({
      declined: declinedJobs,
      pending: pendingJobs,
      interview: interviewJobs,
      byMonth: jobsByMonth,
    });
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}
