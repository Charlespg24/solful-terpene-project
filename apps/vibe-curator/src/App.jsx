import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Pages
import HomePage from './pages/HomePage';
import StrainPage from './pages/StrainPage';
import SessionPage from './pages/SessionPage';
import HumidorPage from './pages/HumidorPage';
import LearnPage from './pages/LearnPage';
import JuicePage from './pages/JuicePage';
import SolfulFull from './pages/SolfulFull';

// Components
import Navigation from './components/Navigation';

// Context for app state
export const AppContext = React.createContext();

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // App state
  const [humidor, setHumidor] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [selectedStrain, setSelectedStrain] = useState(null);

  // Humidor management
  const addToHumidor = (strain) => {
    if (!humidor.find(h => h.id === strain.id)) {
      setHumidor([...humidor, { ...strain, quantity: 'full', addedAt: new Date() }]);
    }
  };

  const removeFromHumidor = (strainId) => {
    setHumidor(humidor.filter(h => h.id !== strainId));
  };

  const updateHumidorQuantity = (strainId, quantity) => {
    setHumidor(humidor.map(h =>
      h.id === strainId ? { ...h, quantity } : h
    ));
  };

  // Session management
  const startSession = (strain, duration) => {
    setCurrentSession({
      strain,
      duration,
      startedAt: new Date(),
      phase: 'onset',
    });
    navigate('/session');
  };

  const endSession = () => {
    setCurrentSession(null);
    navigate('/');
  };

  // Check if we're in an active session
  const isInSession = currentSession !== null;
  const showNav = !isInSession && location.pathname !== '/session';

  const contextValue = {
    humidor,
    addToHumidor,
    removeFromHumidor,
    updateHumidorQuantity,
    currentSession,
    startSession,
    endSession,
    selectedStrain,
    setSelectedStrain,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen bg-cream-100 pb-24">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/strain/:id" element={<StrainPage />} />
            <Route path="/session" element={<SessionPage />} />
            <Route path="/humidor" element={<HumidorPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/juice" element={<JuicePage />} />
            <Route path="/full" element={<SolfulFull />} />
          </Routes>
        </AnimatePresence>

        {showNav && <Navigation />}
      </div>
    </AppContext.Provider>
  );
}

export default App;
