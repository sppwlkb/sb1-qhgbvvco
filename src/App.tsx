import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider';
import { LogoProvider } from './contexts/LogoContext';
import LoginPage from './components/auth/LoginPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './components/layout/Layout';
import PresentationView from './components/presentation/PresentationView';

export default function App() {
  return (
    <AuthProvider>
      <LogoProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/presentation" element={<PresentationView />} />
            <Route path="/*" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </LogoProvider>
    </AuthProvider>
  );
}