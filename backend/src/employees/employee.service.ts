import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto/employee.dto';
import { EmployeeRepository } from './employee.repository';

@Injectable()
export class EmployeeService {
  constructor(private employeeRepository: EmployeeRepository) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    return this.employeeRepository.create(createEmployeeDto);
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [employees, total] = await Promise.all([
      this.employeeRepository.findAll(skip, limit),
      this.employeeRepository.count(),
    ]);

    return {
      data: employees,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string) {
    return this.employeeRepository.findById(id);
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeRepository.update(id, updateEmployeeDto);
  }

  async delete(id: string) {
    return this.employeeRepository.delete(id);
  }
}
