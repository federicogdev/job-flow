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

    const jobs = await prisma.job.findMany({
      where: { userId: currentUser.id },
      orderBy: { createdAt: "desc" },
    });

    // const jobsByMonth: Record<string, number> = {};

    // for (const job of jobs) {
    //   const month = format(job.createdAt, "MMMM yyyy");

    //   if (!jobsByMonth[month]) {
    //     jobsByMonth[month] = 0;
    //   }

    //   jobsByMonth[month] += 1;
    // }

    // const jobsByWeek: Record<string, number> = {};

    // for (const job of jobs) {
    //   const week = format(job.createdAt, "yyyy-'W'ww");

    //   if (!jobsByWeek[week]) {
    //     jobsByWeek[week] = 0;
    //   }

    //   jobsByWeek[week] += 1;
    // }

    // const today = startOfDay(new Date());
    // const oneWeekAgo = subDays(today, 100); // substract 6 days to get the start date of 7 days ago
    // const jobsByDay: Record<string, number> = {};

    // for (const job of jobs) {
    //   if (isWithinInterval(job.createdAt, { start: oneWeekAgo, end: today })) {
    //     const day = format(job.createdAt, "yyyy-MM-dd");

    //     if (!jobsByDay[day]) {
    //       jobsByDay[day] = 0;
    //     }

    //     jobsByDay[day] += 1;
    //   }
    // }

    interface JobsByDay {
      [day: string]: {
        pending: number;
        declined: number;
        interview: number;
      };
    }

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

    const result: JobsByDay = dates.reduce<JobsByDay>((acc, date) => {
      const day = format(date, "yyyy-MM-dd");
      acc[day] = jobsByDay[day] || { pending: 0, declined: 0, interview: 0 };
      return acc;
    }, {});

    // const today = startOfDay(new Date());
    // const oneWeekAgo = subDays(today, 6);
    // const dates = eachDayOfInterval({ start: oneWeekAgo, end: today });
    // const jobsByDay: Record<string, number> = {};

    // for (const job of jobs) {
    //   const day = format(job.createdAt, "yyyy-MM-dd");

    //   if (!jobsByDay[day]) {
    //     jobsByDay[day] = 0;
    //   }

    //   jobsByDay[day] += 1;
    // }

    // const result = dates.reduce((acc: any, date) => {
    //   const day = format(date, "yyyy-MM-dd");
    //   acc[day] = jobsByDay[day] || 0;
    //   return acc;
    // }, {});

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
      // byMonth: jobsByMonth,
      // byWeek: jobsByWeek,
      recent: recentJobs,
      byDay: result,
    });
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}
