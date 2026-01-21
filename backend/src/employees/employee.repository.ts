import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto/employee.dto';

@Injectable()
export class EmployeeRepository {
  constructor(private prisma: PrismaService) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const hashedPassword = await bcrypt.hash(createEmployeeDto.password, 10);

    return this.prisma.employee.create({
      data: {
        name: createEmployeeDto.name,
        email: createEmployeeDto.email,
        phone: createEmployeeDto.phone,
        designation: createEmployeeDto.designation,
        department: createEmployeeDto.department,
        role: createEmployeeDto.role,
        password: hashedPassword,
        dateOfJoining: new Date(),
        status: 'ACTIVE',
      },
    });
  }

  async findAll(skip = 0, take = 10) {
    return this.prisma.employee.findMany({
      skip,
      take,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        designation: true,
        department: true,
        role: true,
        status: true,
        dateOfJoining: true,
      },
    });
  }

  async findById(id: string) {
    return this.prisma.employee.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        designation: true,
        department: true,
        role: true,
        status: true,
        dateOfJoining: true,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.employee.findUnique({
      where: { email },
    });
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    return this.prisma.employee.update({
      where: { id },
      data: updateEmployeeDto,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        designation: true,
        department: true,
        role: true,
        status: true,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.employee.update({
      where: { id },
      data: { status: 'INACTIVE' },
    });
  }

  async count() {
    return this.prisma.employee.count({
      where: { status: 'ACTIVE' },
    });
  }
}
