'use client';

import { attendanceApi, employeeApi } from '@/lib/api-client';
import { useAuthStore } from '@/stores/authStore';
import { formatTime } from '@/utils/helpers';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [attendance, setAttendance] = useState<any>(null);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [loading, setLoading] = useState(true);
  const [checkingIn, setCheckingIn] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      if (user?.role === 'EMPLOYEE') {
        const attendanceData = await attendanceApi.getToday();
        setAttendance(attendanceData);
      } else {
        const employeesData = await employeeApi.getAll(1, 1);
        setTotalEmployees(employeesData.pagination.total);
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    setCheckingIn(true);
    try {
      const result = await attendanceApi.checkIn();
      setAttendance(result);
      alert('Check-in successful!');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Check-in failed');
    } finally {
      setCheckingIn(false);
    }
  };

  const handleCheckOut = async () => {
    setCheckingOut(true);
    try {
      const result = await attendanceApi.checkOut();
      setAttendance(result);
      alert('Check-out successful!');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Check-out failed');
    } finally {
      setCheckingOut(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Welcome, {user?.name}!
      </h1>

      {user?.role === 'EMPLOYEE' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Attendance Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Today's Attendance</h2>
            
            {attendance ? (
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">Check-In Time</p>
                  <p className="text-2xl font-bold text-green-600">
                    {attendance.checkInTime ? formatTime(attendance.checkInTime) : 'Not checked in'}
                  </p>
                </div>

                <div>
                  <p className="text-gray-600">Check-Out Time</p>
                  <p className="text-2xl font-bold text-red-600">
                    {attendance.checkOutTime ? formatTime(attendance.checkOutTime) : 'Not checked out'}
                  </p>
                </div>

                {attendance.workHours && (
                  <div>
                    <p className="text-gray-600">Work Hours</p>
                    <p className="text-2xl font-bold text-blue-600">{attendance.workHours.toFixed(2)} hrs</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-600">No attendance data for today</p>
            )}

            <div className="mt-6 flex gap-3">
              <button
                onClick={handleCheckIn}
                disabled={attendance?.checkInTime || checkingIn}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 transition"
              >
                {checkingIn ? 'Checking In...' : 'Check In'}
              </button>
              <button
                onClick={handleCheckOut}
                disabled={!attendance?.checkInTime || attendance?.checkOutTime || checkingOut}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 transition"
              >
                {checkingOut ? 'Checking Out...' : 'Check Out'}
              </button>
            </div>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">My Profile</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="text-lg font-medium text-gray-900">{user?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-lg font-medium text-gray-900">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Designation</p>
                <p className="text-lg font-medium text-gray-900">{user?.designation}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Role</p>
                <span className="inline-block mt-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {user?.role}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Summary Cards */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-600 text-sm font-medium">Total Employees</h3>
            <p className="text-4xl font-bold text-blue-600 mt-2">{totalEmployees}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-600 text-sm font-medium">Active Employees</h3>
            <p className="text-4xl font-bold text-green-600 mt-2">{totalEmployees}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-600 text-sm font-medium">Today's Attendance</h3>
            <p className="text-4xl font-bold text-purple-600 mt-2">--</p>
          </div>
        </div>
      )}
    </div>
  );
}
