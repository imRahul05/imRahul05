import React from 'react';
import { AppRoutes } from './components/routes/Routes';
import { ElevenLabsAgent } from './components/ElevenLabsAgent';

export default function App() {
  return (
    <>
      <AppRoutes />
      <ElevenLabsAgent />
    </>
  );
}