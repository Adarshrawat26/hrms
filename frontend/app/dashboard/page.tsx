'use client';

import { employeeApi } from '@/lib/api-client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const data = await employeeApi.getAll();
      setEmployees(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading employees:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">HRMS Dashboard</h1>
          <p className="text-gray-600">Welcome to your Human Resource Management System</p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link href="/employees" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer">
            <div className="text-3xl mb-2">👥</div>
            <h2 className="text-xl font-semibold text-gray-800">Employees</h2>
            <p className="text-gray-500 text-sm">Manage employee records</p>
          </Link>

          <Link href="/attendance" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer">
            <div className="text-3xl mb-2">📋</div>
            <h2 className="text-xl font-semibold text-gray-800">Attendance</h2>
            <p className="text-gray-500 text-sm">Track attendance records</p>
          </Link>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl mb-2">📊</div>
            <h2 className="text-xl font-semibold text-gray-800">Reports</h2>
            <p className="text-gray-500 text-sm">View analytics & reports</p>
          </div>
        </div>

        {/* Employees Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Employees Summary</h2>
          
          {loading ? (
            <p className="text-gray-600">Loading employees...</p>
          ) : employees.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No employees found</p>
              <Link href="/employees" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                Add First Employee
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-gray-700">Name</th>
                    <th className="px-4 py-3 text-left text-gray-700">Department</th>
                    <th className="px-4 py-3 text-left text-gray-700">Position</th>
                    <th className="px-4 py-3 text-left text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.slice(0, 5).map((emp) => (
                    <tr key={emp._id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-800">{emp.firstName} {emp.lastName}</td>
                      <td className="px-4 py-3 text-gray-600">{emp.department}</td>
                      <td className="px-4 py-3 text-gray-600">{emp.position}</td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          emp.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {emp.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {employees.length > 5 && (
                <div className="mt-4 text-center">
                  <Link href="/employees" className="text-indigo-600 hover:text-indigo-700 font-medium">
                    View all {employees.length} employees →
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
