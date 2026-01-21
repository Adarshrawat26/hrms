import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): { message: string; status: string } {
    return {
      message: 'HRMS Backend API is running',
      status: 'ok',
    };
  }

  @Get('health')
  health(): { status: string } {
    return { status: 'healthy' };
  }
}
