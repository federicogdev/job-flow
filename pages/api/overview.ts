import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";
import { JobStatus, JobType } from "@prisma/client";
import {
  eachDayOfInterval,
  format,
  isWithinInterval,
  parseISO,
  startOfDay,
  subDays,
} from "date-fns";

interface JobsByDay {
  [day: string]: {
    pending: number;
    declined: number;
    interview: number;
  };
}

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
      orderBy: { createdAt: "desc" },
    });

    const today = startOfDay(new Date());
    const oneWeekAgo = subDays(today, 6);
    const dates = eachDayOfInterval({ start: oneWeekAgo, end: today });
    const jobsByDay: JobsByDay = {};

    for (const job of jobs) {
      const day = format(job.createdAt, "yyyy-MM-dd");

      if (!jobsByDay[day]) {
        jobsByDay[day] = { pending: 0, declined: 0, interview: 0 };
      }

      switch (job.status) {
        case "PENDING":
          jobsByDay[day].pending += 1;
          break;
        case "DECLINED":
          jobsByDay[day].declined += 1;
          break;
        case "INTERVIEW":
          jobsByDay[day].interview += 1;
          break;
      }
    }

    const jobsByDays: JobsByDay = dates.reduce<JobsByDay>((acc, date) => {
      const day = format(date, "yyyy-MM-dd");
      acc[day] = jobsByDay[day] || { pending: 0, declined: 0, interview: 0 };
      return acc;
    }, {});

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
      byDay: jobsByDays,
    });
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}
