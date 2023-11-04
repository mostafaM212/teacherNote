import { StudentAttendance } from './StudentAttendance';

export interface Student {
  _id?: string;
  name: string;
  phone: string;
  createdAt?: string;
  gender: string;
  price: number;
  group?: any;
  studentAttendances: any[];
  paymentMethod: string;
}
