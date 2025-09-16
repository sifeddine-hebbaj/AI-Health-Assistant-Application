import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Calendar, Shield, Stethoscope, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { medicalService } from '../services/medicalService';

export const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [stats, setStats] = useState({ totalPatients: 0, totalAnalyses: 0, diagnosticAccuracy: '0%' });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await medicalService.getStats();
        setStats(data);
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    };

    loadStats();
  }, []);

  const features = [
    {
      icon: <Stethoscope className="h-8 w-8 text-blue-600" />,
      title: 'Analyse des Symptômes IA',
      description: 'Notre IA analyse vos symptômes et vous fournit des recommandations médicales préliminaires.'
    },
    {
      icon: <Calendar className="h-8 w-8 text-green-600" />,
      title: 'Prise de Rendez-vous',
      description: 'Réservez facilement un rendez-vous avec nos médecins spécialisés.'
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: 'Suivi Patient',
      description: 'Accédez à votre historique médical et suivez vos consultations.'
    },
    {
      icon: <Shield className="h-8 w-8 text-red-600" />,
      title: 'Sécurité des Données',
      description: 'Vos données médicales sont protégées et conformes aux normes RGPD.'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <Heart className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            AI Health Assistant
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Votre assistant de santé intelligent qui vous aide à analyser vos symptômes 
            et vous connecte avec les meilleurs professionnels de santé.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/symptoms" 
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Analyser mes Symptômes
            </Link>
            {!isAuthenticated && (
              <Link 
                to="/register" 
                className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Créer un Compte
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Pourquoi choisir AI Health Assistant ?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-50 py-16 rounded-2xl">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Notre Impact
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stats.totalPatients}+</div>
              <div className="text-gray-700">Patients Aidés</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-green-600 mb-2">{stats.diagnosticAccuracy}</div>
              <div className="text-gray-700">Précision Diagnostique</div>
            </div>
                      </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="text-center py-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Prêt à commencer ?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Rejoignez des milliers de patients qui font confiance à notre plateforme
            </p>
            <Link 
              to="/register" 
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg inline-flex items-center space-x-2"
            >
              <Clock className="h-5 w-5" />
              <span>Inscription Gratuite</span>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};