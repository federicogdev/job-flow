import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    if (req.method === "POST") {
    }
    if (req.method === "GET") {
    }
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}
