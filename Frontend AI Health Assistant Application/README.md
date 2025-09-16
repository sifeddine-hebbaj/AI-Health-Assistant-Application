# AI Health Assistant

Une application web complète qui permet aux patients d'entrer leurs symptômes, d'obtenir une analyse IA, et de réserver des rendez-vous avec des médecins.

## 🏗️ Architecture

### Frontend (React + TypeScript + Tailwind CSS)
- **Composants modulaires** : Organisation claire avec séparation des responsabilités
- **Authentification JWT** : Gestion sécurisée des sessions utilisateurs
- **Design responsive** : Interface optimisée pour tous les appareils
- **State management** : Context API pour la gestion d'état globale

### Backend (Spring Boot + Java 17)
- **API REST** : Endpoints sécurisés (authentification/gestion utilisateurs)
- **JPA + Flyway** : Migration et gestion du schéma base de données
- **Sécurité** : Configuration SMTP pour l'email, intégrations IA (Mistral) via variables d'environnement

### Base de Données (PostgreSQL)
- **Schema complet** : Tables pour utilisateurs, médecins, symptômes, analyses, rendez-vous
- **Indexes optimisés** : Performance améliorée pour les requêtes fréquentes
- **Contraintes d'intégrité** : Validation au niveau base de données

## 🚀 Démarrage Rapide

### Développement Local

Backend (Spring Boot):
```bash
# Prérequis: Java 17, Maven, PostgreSQL en local
# Configurer les variables d'environnement (exemples):
# DB_URL=jdbc:postgresql://localhost:5432/aihealthdb
# DB_USERNAME=postgres
# DB_PASSWORD=your-db-password
# MISTRAL_API_KEY=your-key (optionnel)
# MAIL_USERNAME=your-email@example.com (optionnel)
# MAIL_PASSWORD=your-app-password (optionnel)

mvn spring-boot:run
# Backend: http://localhost:8080
```

Frontend (React + Vite):
```bash
# Installer les dépendances
npm install

# Configurer la variable d'environnement API
# Copier .env.example vers .env et adapter VITE_API_URL si nécessaire
# VITE_API_URL=http://localhost:8080/api

# Démarrer le frontend
npm run dev
# Frontend: http://localhost:5173
```

## 👥 Comptes de Démonstration

```
Patient:
Email: patient@demo.com
Mot de passe: password123

Administrateur:
Email: admin@demo.com
Mot de passe: admin123
```

## 📋 Fonctionnalités

### Pour les Patients
- ✅ **Analyse des symptômes** : Saisie détaillée avec évaluation IA
- ✅ **Réservation de rendez-vous** : Interface intuitive de booking
- ✅ **Tableau de bord personnel** : Historique des consultations et analyses
- ✅ **Profil utilisateur** : Gestion des informations personnelles

### Pour les Administrateurs
- ✅ **Vue d'ensemble** : Statistiques globales de la plateforme
- ✅ **Gestion des patients** : Liste complète avec historiques
- ✅ **Monitoring** : Activité récente et métriques importantes
- ✅ **Rapports** : Analyses des tendances et cas urgents

### Fonctionnalités Techniques
- ✅ **Authentification JWT** : Sécurité robuste
- ✅ **API REST complète** : Endpoints d'authentification et médical
- ✅ **Responsive design** : Compatible mobile/desktop
- ✅ **Validation en temps réel** : UX optimisée
- ✅ **Gestion d'erreurs** : Messages utilisateur clairs

## 🏥 Analyse IA des Symptômes

Le système d'analyse utilise un moteur de règles sophistiqué qui :

1. **Évalue la sévérité** : Combine intensité, durée et mots-clés
2. **Détermine le niveau de risque** : Low, Medium, High, Urgent
3. **Recommande une spécialité** : Médecine générale, Cardiologie, Neurologie, etc.
4. **Génère des conseils personnalisés** : Recommandations adaptées

### Exemple d'analyse :
```json
{
  "riskLevel": "medium",
  "aiRecommendation": "Vos symptômes nécessitent une attention médicale. Une consultation en médecine générale est conseillée.",
  "suggestedSpecialty": "Médecine Générale"
}
```

## 🔗 API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Profil utilisateur

### Médical
- `POST /api/medical/analyze` - Analyse des symptômes
- `GET /api/medical/doctors` - Liste des médecins
- `POST /api/medical/appointments` - Créer un rendez-vous
- `GET /api/medical/patients/:id/history` - Historique patient

### Administration
- `GET /api/medical/patients` - Tous les patients (admin)

## 🛠️ Technologies Utilisées

### Frontend
- **React 18** avec TypeScript
- **Tailwind CSS** pour le styling
- **Lucide React** pour les icônes
- **React Router** pour la navigation
- **Axios** pour les appels API

### Backend
- **Spring Boot 3** (Java 17)
- **Spring Data JPA**, **Flyway**
- **PostgreSQL**

### Base de Données
- **PostgreSQL** avec UUID
- **Indexes optimisés**
- **Contraintes d'intégrité**
- **Migrations Flyway**

### DevOps
- **Docker** (optionnel) – À adapter pour l'API Spring Boot si nécessaire

## 🔧 Configuration

### Variables d'Environnement (exemples)

```bash
# Frontend (.env)
VITE_API_URL=http://localhost:8080/api
```

## 📈 Évolutions Futures

### Fonctionnalités Prévues
- 🔲 **Intégration IA avancée** : Modèles ML réels (TensorFlow.js)
- 🔲 **Notifications push** : Rappels de rendez-vous
- 🔲 **Téléconsultation** : Vidéo-conférences intégrées
- 🔲 **Historique médical** : Import/export de données
- 🔲 **Géolocalisation** : Médecins à proximité
- 🔲 **Paiements** : Intégration Stripe
- 🔲 **Mobile app** : React Native

### Améliorations Techniques
- 🔲 **Tests automatisés** : Jest, Cypress
- 🔲 **CI/CD Pipeline** : GitHub Actions
- 🔲 **Monitoring** : Sentry, Analytics
- 🔲 **Cache Redis** : Performance améliorée
- 🔲 **WebSockets** : Notifications temps réel

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -m 'Ajouter nouvelle fonctionnalité'`)
4. Push la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

Pour toute question ou problème :
- 🐛 Issues: GitHub Issues (du dépôt)
- 📚 Documentation: Wiki du dépôt (si disponible)

---
**⚠️ Avertissement Médical**

Cette application est fournie uniquement à des fins éducatives et ne remplace pas un avis médical professionnel. Consultez toujours un médecin qualifié pour un diagnostic et un traitement appropriés.