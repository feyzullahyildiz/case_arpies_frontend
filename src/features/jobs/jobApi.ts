import { JobType } from "../../types";

export function fetchJobs(): Promise<JobType[]> {
  return fetch("https://case-arpies-backend.onrender.com/api/data").then(
    (res) => res.json(),
  );
}
