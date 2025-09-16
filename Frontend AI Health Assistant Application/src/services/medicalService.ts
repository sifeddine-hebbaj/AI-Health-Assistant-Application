import axios from 'axios';
import { SymptomAnalysis, Doctor, Appointment } from '../types/medical';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});


export const medicalService = {
  async analyzeSymptoms(symptoms: any[]): Promise<SymptomAnalysis> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const payload = { symptoms, patientId: user.id };
    const response = await api.post('/symptom-analyses', payload);
    return response.data;
  },

  async getDoctors(): Promise<Doctor[]> {
    const response = await api.get('/doctors');
    return response.data;
  },

  async bookAppointment(appointmentData: any): Promise<Appointment> {
    const response = await api.post('/appointments', appointmentData);
    return response.data;
  },

  async getPatientHistory(patientId: string): Promise<{
    analyses: SymptomAnalysis[];
    appointments: Appointment[];
  }> {
    const [analysesRes, appointmentsRes] = await Promise.all([
      api.get(`/symptom-analyses/patient/${patientId}`),
      api.get(`/appointments/patient/${patientId}`)
    ]);
    return {
      analyses: analysesRes.data,
      appointments: appointmentsRes.data
    };
  },

  async getAllPatients(): Promise<any[]> {
    const response = await api.get('/patients');
    return response.data;
  },

  async getStats(): Promise<any> {
    const response = await api.get('/stats');
    return response.data;
  },

  async getAvailableTimes(doctorId: string, date: string): Promise<string[]> {
    const response = await api.get('/appointments/available', {
      params: { doctorId, date }
    });
    // API returns an array of times as HH:mm:ss; normalize to HH:mm for display
    const times: string[] = response.data || [];
    return times.map((t: string) => (t?.length >= 5 ? t.slice(0, 5) : t));
  }
};