export interface Symptom {
  id: string;
  name: string;
  severity: 'low' | 'medium' | 'high';
  duration: string;
  description?: string;
}

export interface SymptomAnalysis {
  id: string;
  patientId: string;
  symptoms: Symptom[];
  aiRecommendation: string;
  riskLevel: 'low' | 'medium' | 'high' | 'urgent';
  suggestedSpecialty: string;
  createdAt: string;
}

export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  specialty: string;
  email: string;
  phone: string;
  availability: string[];
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  symptoms: string;
  notes?: string;
  createdAt: string;
}