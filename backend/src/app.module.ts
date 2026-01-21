import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AttendanceModule } from './attendance/attendance.module';
import { AuthModule } from './auth/auth.module';
import { AppConfigService } from './config/config.service';
import { configuration } from './config/configuration';
import { EmployeeModule } from './employees/employee.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    PrismaModule,
    AuthModule,
    EmployeeModule,
    AttendanceModule,
  ],
  providers: [AppConfigService],
})
export class AppModule {}
