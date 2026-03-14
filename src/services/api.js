import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Attach token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Dashboard
export const getDashboardSummary    = () => api.get('/dashboard/summary');
export const getEnrollmentTrends    = () => api.get('/dashboard/enrollment-trends');
export const getCourseDistribution  = () => api.get('/dashboard/course-distribution');
export const getAttendanceTrends    = () => api.get('/dashboard/attendance-trends');
export const getRecentActivity      = () => api.get('/dashboard/recent-activity');

// Students
export const getStudents            = () => api.get('/students');
export const getStudentStats        = () => api.get('/students/stats');

// Courses
export const getCourses             = () => api.get('/courses');

export default api;