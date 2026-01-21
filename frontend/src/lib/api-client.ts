import api from '@/lib/api';

export const employeeApi = {
  getAll: async () => {
    const response = await api.get('/employees');
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
  mark: async (data: any) => {
    const response = await api.post('/attendance', data);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/attendance');
    return response.data;
  },

  getByEmployee: async (employeeId: string) => {
    const response = await api.get(`/attendance/employee/${employeeId}`);
    return response.data;
  },

  checkout: async (id: string, checkOut: string) => {
    const response = await api.put(`/attendance/${id}`, { checkOut });
    return response.data;
  },
};
