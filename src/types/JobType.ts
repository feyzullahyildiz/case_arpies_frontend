import { PriorityEnum } from "./PriorityEnum";

export interface JobType {
  id: number;
  name: string;
  priority: PriorityEnum;
}
