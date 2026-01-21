export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'EMPLOYEE';
  designation: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  designation: string;
  department: string;
  role: string;
  status: string;
  dateOfJoining: string;
}

export interface Attendance {
  id: string;
  employeeId: string;
  checkInTime?: string;
  checkOutTime?: string;
  workHours?: number;
  date: string;
  employee?: Employee;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}
