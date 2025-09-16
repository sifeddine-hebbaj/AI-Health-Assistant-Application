import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Plus, X, AlertTriangle, CheckCircle, Clock, Stethoscope } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { medicalService } from '../services/medicalService';

interface Symptom {
  name: string;
  severity: 'low' | 'medium' | 'high';
  duration: string;
  description?: string;
}

export const SymptomAnalysis: React.FC = () => {
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [currentSymptom, setCurrentSymptom] = useState<Symptom>({
    name: '',
    severity: 'medium',
    duration: '',
    description: ''
  });
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const addSymptom = () => {
    if (currentSymptom.name && currentSymptom.duration) {
      setSymptoms([...symptoms, currentSymptom]);
      setCurrentSymptom({
        name: '',
        severity: 'medium',
        duration: '',
        description: ''
      });
    }
  };

  const removeSymptom = (index: number) => {
    setSymptoms(symptoms.filter((_, i) => i !== index));
  };

  const analyzeSymptoms = async () => {
    if (symptoms.length === 0) return;

    setLoading(true);
    try {
      const result = await medicalService.analyzeSymptoms(symptoms);
      setAnalysis(result);
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'medium': return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'high': return <AlertTriangle className="h-5 w-5 text-orange-600" />;
      case 'urgent': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default: return <Stethoscope className="h-5 w-5 text-blue-600" />;
    }
  };

  // Clean AI text: remove code fences, strip leading `json`, and parse JSON if present
  const extractPlainText = (text: string) => {
    if (!text) return '';
    let t = String(text).trim();
    // Remove markdown code fences and optional leading 'json'
    t = t.replace(/```/g, '').replace(/^json\s*/i, '').trim();
    // Try to parse JSON and pick aiRecommendation when available
    try {
      const parsed = JSON.parse(t);
      if (typeof parsed === 'string') return parsed.trim();
      if (parsed && typeof parsed === 'object') {
        if (parsed.aiRecommendation) return String(parsed.aiRecommendation).trim();
      }
    } catch (_) {
      // Not JSON, fall through
    }
    return t;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <Brain className="h-12 w-12 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Analyse des Symptômes par IA
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Décrivez vos symptômes et obtenez une analyse préliminaire avec des recommandations personnalisées
        </p>
      </div>

      {/* Symptom Input Form */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Ajouter un symptôme
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom du symptôme
            </label>
            <input
              type="text"
              value={currentSymptom.name}
              onChange={(e) => setCurrentSymptom({...currentSymptom, name: e.target.value})}
              placeholder="Ex: Mal de tête, Fièvre, Toux..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Intensité
            </label>
            <select
              value={currentSymptom.severity}
              onChange={(e) => setCurrentSymptom({...currentSymptom, severity: e.target.value as any})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="low">Faible</option>
              <option value="medium">Modérée</option>
              <option value="high">Élevée</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Durée
            </label>
            <input
              type="text"
              value={currentSymptom.duration}
              onChange={(e) => setCurrentSymptom({...currentSymptom, duration: e.target.value})}
              placeholder="Ex: 2 jours, 1 semaine..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (optionnel)
            </label>
            <input
              type="text"
              value={currentSymptom.description}
              onChange={(e) => setCurrentSymptom({...currentSymptom, description: e.target.value})}
              placeholder="Détails supplémentaires..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <button
          onClick={addSymptom}
          disabled={!currentSymptom.name || !currentSymptom.duration}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Ajouter le symptôme</span>
        </button>
      </div>

      {/* Current Symptoms List */}
      {symptoms.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Symptômes ajoutés ({symptoms.length})
          </h2>
          
          <div className="space-y-4">
            {symptoms.map((symptom, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-medium text-gray-900">{symptom.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(symptom.severity)}`}>
                      {symptom.severity === 'low' ? 'Faible' : symptom.severity === 'medium' ? 'Modérée' : 'Élevée'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Durée: {symptom.duration}
                    {symptom.description && ` • ${symptom.description}`}
                  </p>
                </div>
                <button
                  onClick={() => removeSymptom(index)}
                  className="text-red-600 hover:text-red-700 p-2"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={analyzeSymptoms}
            disabled={loading || symptoms.length === 0}
            className="mt-6 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Brain className="h-5 w-5" />
            <span>{loading ? 'Analyse en cours...' : 'Analyser mes symptômes'}</span>
          </button>
        </div>
      )}

      {/* AI Analysis Results */}
      {analysis && (
        <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-600">
          <div className="flex items-center space-x-3 mb-6">
            <Brain className="h-8 w-8 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-900">
              Analyse IA - Recommandations
            </h2>
          </div>

          <div className="space-y-6">
            {/* Risk Level */}
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              {getRiskIcon(analysis.riskLevel)}
              <div>
                <h3 className="font-medium text-gray-900">Niveau de Risque</h3>
                <p className="text-gray-600 capitalize">{analysis.riskLevel}</p>
              </div>
            </div>

            {/* AI Recommendation */}
            <div className="p-6 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-3">Recommandation de l'IA</h3>
              <p className="text-blue-800 leading-relaxed">{extractPlainText(analysis.aiRecommendation)}</p>
            </div>

            {/* Suggested Specialty */}
            {analysis.suggestedSpecialty && (
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">Spécialité recommandée</h3>
                <p className="text-green-800">{analysis.suggestedSpecialty}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              {isAuthenticated ? (
                <button onClick={() => navigate('/booking')} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Stethoscope className="h-5 w-5" />
                  <span>Réserver un Rendez-vous</span>
                </button>
              ) : (
                <p className="text-gray-600">
                  <a href="/login" className="text-blue-600 hover:text-blue-700">Connectez-vous</a> pour réserver un rendez-vous
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-yellow-900 mb-2">Avertissement Important</h3>
            <p className="text-yellow-800 text-sm leading-relaxed">
              Cette analyse est fournie uniquement à titre informatif et ne remplace pas un avis médical professionnel. 
              Consultez toujours un médecin qualifié pour un diagnostic et un traitement appropriés.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};