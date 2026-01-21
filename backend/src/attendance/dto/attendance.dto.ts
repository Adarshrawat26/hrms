export class CheckInDto {
  employeeId: string = '';
}

export class CheckOutDto {
  employeeId: string = '';
}

export class AttendanceReportDto {
  startDate: Date = new Date();
  endDate: Date = new Date();
  employeeId?: string;
}
