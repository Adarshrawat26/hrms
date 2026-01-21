import { Roles } from '@/common/decorators/roles.decorator';
import { AllExceptionsFilter } from '@/common/filters/http-exception.filter';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseFilters, UseGuards } from '@nestjs/common';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto/employee.dto';
import { EmployeeService } from './employee.service';

@Controller('employees')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseFilters(AllExceptionsFilter)
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Post()
  @Roles('ADMIN')
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  @Roles('ADMIN', 'MANAGER')
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.employeeService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.employeeService.findById(id);
  }

  @Put(':id')
  @Roles('ADMIN', 'MANAGER')
  async update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  async delete(@Param('id') id: string) {
    return this.employeeService.delete(id);
  }
}
