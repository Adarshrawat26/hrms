import {
    Controller,
    Get,
    Param,
    Post,
    Query,
    UseFilters,
    UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { AllExceptionsFilter } from '../common/filters/http-exception.filter';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseFilters(AllExceptionsFilter)
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}

  @Post('check-in')
  async checkIn(@CurrentUser() user: any) {
    return this.attendanceService.checkIn(user.id);
  }

  @Post('check-out')
  async checkOut(@CurrentUser() user: any) {
    return this.attendanceService.checkOut(user.id);
  }

  @Get('today')
  async getTodayAttendance(@CurrentUser() user: any) {
    return this.attendanceService.getTodayAttendance(user.id);
  }

  @Get('report')
  @Roles('ADMIN', 'MANAGER')
  async getAttendanceReport(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('employeeId') employeeId?: string,
  ) {
    return this.attendanceService.getAttendanceReport(
      new Date(startDate),
      new Date(endDate),
      employeeId,
    );
  }

  @Get('daily-report/:date')
  @Roles('ADMIN', 'MANAGER')
  async getDailyReport(@Param('date') date: string) {
    return this.attendanceService.getDailyReport(new Date(date));
  }
}
