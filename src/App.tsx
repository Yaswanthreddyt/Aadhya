import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import { Login } from './components/Login';
import { LoadingScreen } from './components/LoadingScreen';
import { MotivationalQuote } from './components/quotes/MotivationalQuote';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const AppContent = () => {
  const { currentUser, isLoading } = useAuth();
  const [showQuote, setShowQuote] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setShowQuote(true);
    }
  }, [currentUser]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!currentUser) {
    return <Login />;
  }

  if (showQuote) {
    return <MotivationalQuote onComplete={() => setShowQuote(false)} />;
  }

  return (
    <Dashboard 
      showPremiumPreview={showPremiumModal} 
      onClosePremium={() => setShowPremiumModal(false)}
      onShowPremium={() => setShowPremiumModal(true)}
    />
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
