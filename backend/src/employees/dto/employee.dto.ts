import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

enum Role {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  EMPLOYEE = 'EMPLOYEE',
}

export class CreateEmployeeDto {
  @IsString()
  name: string = '';

  @IsEmail()
  email: string = '';

  @IsString()
  phone: string = '';

  @IsString()
  designation: string = '';

  @IsString()
  department: string = '';

  @IsString()
  @MinLength(6)
  password: string = '';

  @IsEnum(Role)
  role: Role = Role.EMPLOYEE;
}

export class UpdateEmployeeDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  designation?: string;

  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
