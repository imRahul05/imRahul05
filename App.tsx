import React from 'react';
import { useLocation } from 'react-router-dom';
import { AppRoutes } from './components/routes/Routes';
import { ElevenLabsAgent } from './components/ElevenLabsAgent';

export default function App() {
  const location = useLocation();

  return (
    <>
      <AppRoutes />
      {location.pathname === '/' && <ElevenLabsAgent />}
    </>
  );
}