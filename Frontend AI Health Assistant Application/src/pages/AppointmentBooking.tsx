import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Stethoscope, CheckCircle } from 'lucide-react';
import { medicalService } from '../services/medicalService';
import { useAuth } from '../contexts/AuthContext';

export const AppointmentBooking: React.FC = () => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    loadDoctors();
  }, []);

  // Load available times when doctor or date changes
  useEffect(() => {
    const fetchTimes = async () => {
      setSelectedTime('');
      if (!selectedDoctor || !selectedDate) {
        setAvailableTimes([]);
        return;
      }
      try {
        const times = await medicalService.getAvailableTimes(selectedDoctor.id, selectedDate);
        setAvailableTimes(times);
        if (times.length > 0) {
          setSelectedTime(times[0]); // pick earliest available, e.g., 09:00
        }
      } catch (e) {
        console.error('Error loading available times:', e);
        setAvailableTimes([]);
      }
    };
    fetchTimes();
  }, [selectedDoctor, selectedDate]);

  const loadDoctors = async () => {
    try {
      const doctorsData = await medicalService.getDoctors();
      setDoctors(doctorsData);
    } catch (error) {
      console.error('Error loading doctors:', error);
    }
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor || !selectedDate || !selectedTime) return;

    setLoading(true);
    try {
      await medicalService.bookAppointment({
        doctorId: selectedDoctor.id,
        date: selectedDate,
        time: selectedTime,
        symptoms,
        patientId: user?.id
      });
      setSuccess(true);
      // Reset form
      setSelectedDoctor(null);
      setSelectedDate('');
      setSelectedTime('');
      setSymptoms('');
      setAvailableTimes([]);
    } catch (error) {
      console.error('Error booking appointment:', error);
    } finally {
      setLoading(false);
    }
  };

  // Times are now provided dynamically by backend via availableTimes state

  if (success) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Rendez-vous Confirmé !
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Votre rendez-vous a été réservé avec succès. Vous recevrez un email de confirmation.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Nouveau Rendez-vous
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <Calendar className="h-12 w-12 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Réserver un Rendez-vous
        </h1>
        <p className="text-lg text-gray-600">
          Choisissez votre médecin et votre créneau préféré
        </p>
      </div>

      <form onSubmit={handleBooking} className="space-y-8">
        {/* Doctor Selection */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
            <Stethoscope className="h-6 w-6 text-blue-600" />
            <span>Choisir un Médecin</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                onClick={() => setSelectedDoctor(doctor)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedDoctor?.id === doctor.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <User className="h-10 w-10 text-gray-600 bg-gray-100 rounded-full p-2" />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Dr. {doctor.firstName} {doctor.lastName}
                    </h3>
                    <p className="text-sm text-gray-600">{doctor.specialty}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Date and Time Selection */}
        {selectedDoctor && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <Clock className="h-6 w-6 text-blue-600" />
              <span>Date et Heure</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heure
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Sélectionner une heure</option>
                  {availableTimes.slice(0, 1).map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Symptoms Description */}
        {selectedDate && selectedTime && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Motif de Consultation
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Décrivez brièvement vos symptômes ou le motif de votre visite
              </label>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                rows={4}
                placeholder="Ex: Mal de tête persistant depuis 3 jours, fièvre légère..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !selectedDoctor || !selectedDate || !selectedTime}
              className="mt-6 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Calendar className="h-5 w-5" />
              <span>{loading ? 'Réservation...' : 'Confirmer le Rendez-vous'}</span>
            </button>
          </div>
        )}
      </form>

      {/* Selected Appointment Summary */}
      {selectedDoctor && selectedDate && selectedTime && (
        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-4">Récapitulatif</h3>
          <div className="space-y-2 text-blue-800">
            <p><strong>Médecin:</strong> Dr. {selectedDoctor.firstName} {selectedDoctor.lastName} - {selectedDoctor.specialty}</p>
            <p><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString('fr-FR')}</p>
            <p><strong>Heure:</strong> {selectedTime}</p>
          </div>
        </div>
      )}
    </div>
  );
};