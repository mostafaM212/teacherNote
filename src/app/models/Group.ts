export interface Group {
  _id?: string;
  stage: string;
  name: string;
  createdAt?: string;
  gender: string;
  user?: any;
  period: number;
  appointments: { day: number; time: string }[];
}
