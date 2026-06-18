import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Open Jobs",
  description:
    "Current openings at UnitForce Technologies across engineering, software, AI, and recruitment.",
  alternates: { canonical: "/jobs" },
};

export { default } from "./jobs-view";
