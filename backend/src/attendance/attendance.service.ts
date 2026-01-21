import { Injectable } from '@nestjs/common';
import { AttendanceRepository } from './attendance.repository';

@Injectable()
export class AttendanceService {
  constructor(private attendanceRepository: AttendanceRepository) {}

  async checkIn(employeeId: string) {
    return this.attendanceRepository.checkIn(employeeId);
  }

  async checkOut(employeeId: string) {
    return this.attendanceRepository.checkOut(employeeId);
  }

  async getTodayAttendance(employeeId: string) {
    return this.attendanceRepository.getTodayAttendance(employeeId);
  }

  async getAttendanceReport(startDate: Date, endDate: Date, employeeId?: string) {
    return this.attendanceRepository.getAttendanceReport(startDate, endDate, employeeId);
  }

  async getDailyReport(date: Date) {
    return this.attendanceRepository.getDailyReport(date);
  }
}
