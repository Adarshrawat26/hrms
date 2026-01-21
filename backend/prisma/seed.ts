import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create demo employees
  const adminPassword = await bcrypt.hash('password123', 10);
  const managerPassword = await bcrypt.hash('password123', 10);
  const employeePassword = await bcrypt.hash('password123', 10);

  // Admin user
  const admin = await prisma.employee.upsert({
    where: { email: 'admin@hrms.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@hrms.com',
      phone: '+1234567890',
      designation: 'HR Administrator',
      department: 'Human Resources',
      password: adminPassword,
      role: 'ADMIN',
      status: 'ACTIVE',
      dateOfJoining: new Date('2024-01-01'),
    },
  });

  console.log('✅ Created admin:', admin.email);

  // Manager user
  const manager = await prisma.employee.upsert({
    where: { email: 'manager@hrms.com' },
    update: {},
    create: {
      name: 'Manager User',
      email: 'manager@hrms.com',
      phone: '+1234567891',
      designation: 'Team Lead',
      department: 'Engineering',
      password: managerPassword,
      role: 'MANAGER',
      status: 'ACTIVE',
      dateOfJoining: new Date('2024-01-15'),
    },
  });

  console.log('✅ Created manager:', manager.email);

  // Regular employee
  const employee = await prisma.employee.upsert({
    where: { email: 'employee@hrms.com' },
    update: {},
    create: {
      name: 'Employee User',
      email: 'employee@hrms.com',
      phone: '+1234567892',
      designation: 'Software Developer',
      department: 'Engineering',
      password: employeePassword,
      role: 'EMPLOYEE',
      status: 'ACTIVE',
      dateOfJoining: new Date('2024-02-01'),
    },
  });

  console.log('✅ Created employee:', employee.email);

  // Create sample attendance records
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < 5; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    await prisma.attendance.upsert({
      where: {
        employeeId_date: {
          employeeId: employee.id,
          date,
        },
      },
      update: {},
      create: {
        employeeId: employee.id,
        date,
        checkInTime: new Date(date.getTime() + 9 * 60 * 60 * 1000), // 9 AM
        checkOutTime: new Date(date.getTime() + 17 * 60 * 60 * 1000), // 5 PM
        workHours: 8,
      },
    });
  }

  console.log('✅ Created attendance records');

  console.log('🎉 Database seeding completed!');
  console.log('');
  console.log('📝 Demo Login Credentials:');
  console.log('');
  console.log('Admin:');
  console.log('  Email: admin@hrms.com');
  console.log('  Password: password123');
  console.log('');
  console.log('Manager:');
  console.log('  Email: manager@hrms.com');
  console.log('  Password: password123');
  console.log('');
  console.log('Employee:');
  console.log('  Email: employee@hrms.com');
  console.log('  Password: password123');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
