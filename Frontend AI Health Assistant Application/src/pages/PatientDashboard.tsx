import React, { useState, useEffect } from 'react';
import { Calendar, FileText, Clock, User, Stethoscope, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { medicalService } from '../services/medicalService';

export const PatientDashboard: React.FC = () => {
  const [history, setHistory] = useState<any>({ analyses: [], appointments: [] });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadPatientHistory();
  }, []);

  const loadPatientHistory = async () => {
    if (!user?.id) return;
    
    try {
      const data = await medicalService.getPatientHistory(user.id);
      setHistory(data);
    } catch (error) {
      console.error('Error loading patient history:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper to display clean AI recommendation text (no code fences/JSON)
  const extractPlainText = (text: string) => {
    if (!text) return '';
    let t = String(text).trim();
    t = t.replace(/```/g, '').replace(/^json\s*/i, '').trim();
    try {
      const parsed = JSON.parse(t);
      if (typeof parsed === 'string') return parsed.trim();
      if (parsed && typeof parsed === 'object' && (parsed as any).aiRecommendation) {
        return String((parsed as any).aiRecommendation).trim();
      }
    } catch (_) {}
    return t;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <User className="h-12 w-12 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Bonjour, {user?.firstName} {user?.lastName}
        </h1>
        <p className="text-lg text-gray-600">
          Voici votre tableau de bord médical personnel
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <FileText className="h-10 w-10 text-blue-600" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{history.analyses?.length || 0}</h3>
              <p className="text-gray-600">Analyses IA</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <Calendar className="h-10 w-10 text-green-600" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{history.appointments?.length || 0}</h3>
              <p className="text-gray-600">Rendez-vous</p>
            </div>
          </div>
        </div>

      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Symptom Analyses */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
            <FileText className="h-6 w-6 text-blue-600" />
            <span>Analyses Récentes</span>
          </h2>

          {history.analyses?.length > 0 ? (
            <div className="space-y-4">
              {history.analyses.slice(0, 5).map((analysis: any) => (
                <div key={analysis.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">
                        Analyse du {new Date(analysis.createdAt).toLocaleDateString('fr-FR')}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(analysis.riskLevel)}`}>
                          Risque {analysis.riskLevel}
                        </span>
                        <span className="text-sm text-gray-600">
                          {analysis.suggestedSpecialty}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {extractPlainText(analysis.aiRecommendation)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Aucune analyse disponible</p>
              <a href="/symptoms" className="text-blue-600 hover:text-blue-700 mt-2 inline-block">
                Analyser vos symptômes
              </a>
            </div>
          )}
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
            <Calendar className="h-6 w-6 text-green-600" />
            <span>Mes Rendez-vous</span>
          </h2>

          {history.appointments?.length > 0 ? (
            <div className="space-y-4">
              {history.appointments.slice(0, 5).map((appointment: any) => (
                <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">
                        Dr. {appointment.doctor?.firstName} {appointment.doctor?.lastName}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {appointment.doctor?.specialty}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(appointment.date).toLocaleDateString('fr-FR')}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{appointment.time}</span>
                        </span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                      {appointment.status === 'scheduled' ? 'Programmé' : 
                       appointment.status === 'completed' ? 'Terminé' : 'Annulé'}
                    </span>
                  </div>
                  {appointment.symptoms && (
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      <strong>Motif:</strong> {appointment.symptoms}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Aucun rendez-vous programmé</p>
              <a href="/booking" className="text-green-600 hover:text-green-700 mt-2 inline-block">
                Réserver un rendez-vous
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Actions Rapides</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <a
            href="/symptoms"
            className="bg-white bg-opacity-20 hover:bg-opacity-30 p-6 rounded-lg transition-colors text-center"
          >
            <Stethoscope className="h-8 w-8 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Nouvelle Analyse</h3>
            <p className="text-sm opacity-90">Analyser de nouveaux symptômes</p>
          </a>
          <a
            href="/booking"
            className="bg-white bg-opacity-20 hover:bg-opacity-30 p-6 rounded-lg transition-colors text-center"
          >
            <Calendar className="h-8 w-8 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Nouveau RDV</h3>
            <p className="text-sm opacity-90">Réserver un rendez-vous</p>
          </a>
        </div>
      </div>
    </div>
  );
};