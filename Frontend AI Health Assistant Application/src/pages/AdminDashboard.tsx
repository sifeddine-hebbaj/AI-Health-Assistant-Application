import React, { useState, useEffect } from 'react';
import { Shield, Users, Calendar, FileText, TrendingUp, AlertTriangle } from 'lucide-react';
import { medicalService } from '../services/medicalService';

export const AdminDashboard: React.FC = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({ totalPatients: 0, totalAnalyses: 0, totalAppointments: 0, highRiskCases: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      // Load patients (for tables) and stats (for counts)
      const [patientsData, statsData] = await Promise.all([
        medicalService.getAllPatients(),
        medicalService.getStats()
      ]);
      setPatients(patientsData);
      setStats(statsData || {});
    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Helpers to safely display dates and durations
  const parseDate = (value: any): Date | null => {
    if (!value) return null;
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
  };

  const formatDateFR = (value: any): string => {
    const d = parseDate(value);
    return d ? d.toLocaleDateString('fr-FR') : "Aujourd'hui";
  };

  const daysSince = (value: any): string => {
    const d = parseDate(value);
    if (!d) return '0';
    const diffMs = Date.now() - d.getTime();
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return isNaN(days) ? '-' : String(days);
  };

  // Sort patients by createdAt desc on the client as a fallback
  const sortedPatients = [...patients].sort((a, b) => {
    const da = parseDate(a?.createdAt)?.getTime() ?? 0;
    const db = parseDate(b?.createdAt)?.getTime() ?? 0;
    return db - da;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <Shield className="h-12 w-12 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Tableau de Bord Administrateur
        </h1>
        <p className="text-lg text-gray-600">
          Vue d'ensemble de la plateforme et gestion des patients
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <Users className="h-10 w-10 text-blue-600" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{stats.totalPatients || 0}</h3>
              <p className="text-gray-600">Patients Total</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <FileText className="h-10 w-10 text-green-600" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{stats.totalAnalyses || 0}</h3>
              <p className="text-gray-600">Analyses IA</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <Calendar className="h-10 w-10 text-purple-600" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{stats.totalAppointments || 0}</h3>
              <p className="text-gray-600">Rendez-vous</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <AlertTriangle className="h-10 w-10 text-red-600" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{stats.highRiskCases || 0}</h3>
              <p className="text-gray-600">Cas Urgents</p>
            </div>
          </div>
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
            <Users className="h-6 w-6 text-blue-600" />
            <span>Liste des Patients</span>
          </h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Total: {patients.length} patients</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Analyses
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rendez-vous
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dernière Activité
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {patients.slice(0, 10).map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {patient.firstName} {patient.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {patient.id.substring(0, 8)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {patient.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      {patient.analyses?.length || 0}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      {patient.appointments?.length || 0}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDateFR(patient.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Actif
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <TrendingUp className="h-6 w-6 text-purple-600" />
          <span>Activité Récente</span>
        </h2>

        <div className="space-y-4">
          {sortedPatients.slice(0, 5).map((patient, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {patient.firstName} {patient.lastName}
                </p>
                <p className="text-sm text-gray-500">
                  Nouvelle inscription • {formatDateFR(patient.createdAt)}
                </p>
              </div>
              <div className="flex-shrink-0 text-sm text-gray-500">
                {daysSince(patient.createdAt)} jours
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};