import { NextResponse } from "next/server";
import { fetchLatestJobs } from "@/lib/jobs";

// Always run on request — fetch the latest jobs fresh every time.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const jobs = await fetchLatestJobs(4);
  return NextResponse.json(
    { jobs },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}
