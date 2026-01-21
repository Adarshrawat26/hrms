import api from '@/lib/api';
import { AuthResponse } from '@/types';

export const authApi = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
};

export const employeeApi = {
  getAll: async (page = 1, limit = 10) => {
    const response = await api.get('/employees', { params: { page, limit } });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/employees/${id}`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post('/employees', data);
    return response.data;
  },

  update: async (id: string, data: any) => {
    const response = await api.put(`/employees/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/employees/${id}`);
    return response.data;
  },
};

export const attendanceApi = {
  checkIn: async () => {
    const response = await api.post('/attendance/check-in');
    return response.data;
  },

  checkOut: async () => {
    const response = await api.post('/attendance/check-out');
    return response.data;
  },

  getToday: async () => {
    const response = await api.get('/attendance/today');
    return response.data;
  },

  getReport: async (startDate: string, endDate: string, employeeId?: string) => {
    const response = await api.get('/attendance/report', {
      params: { startDate, endDate, employeeId },
    });
    return response.data;
  },

  getDailyReport: async (date: string) => {
    const response = await api.get(`/attendance/daily-report/${date}`);
    return response.data;
  },
};
