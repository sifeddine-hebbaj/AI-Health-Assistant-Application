import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, User, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg border-b border-blue-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
            <Heart className="h-8 w-8" />
            <span className="text-xl font-bold">AI Health Assistant</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${
                isActive('/') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Accueil
            </Link>
            <Link 
              to="/symptoms" 
              className={`font-medium transition-colors ${
                isActive('/symptoms') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Analyser Symptômes
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/booking" 
                  className={`font-medium transition-colors ${
                    isActive('/booking') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  Réserver RDV
                </Link>
                <Link 
                  to="/dashboard" 
                  className={`font-medium transition-colors ${
                    isActive('/dashboard') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  Mon Tableau de Bord
                </Link>
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    className={`font-medium transition-colors flex items-center space-x-1 ${
                      isActive('/admin') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    <Shield className="h-4 w-4" />
                    <span>Administration</span>
                  </Link>
                )}
              </>
            ) : null}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {user?.firstName} {user?.lastName}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm">Déconnexion</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Connexion
                </Link>
                <Link 
                  to="/register" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Inscription
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};