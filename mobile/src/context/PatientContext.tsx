import React, { createContext, useState, ReactNode } from 'react';

export interface TriageSession {
  id: string;
  patientName: string;
  reason: string;
  status: 'pending' | 'accepted' | 'completed';
}

export interface PatientContextType {
  activeTriageSession: TriageSession | null;
  setActiveTriageSession: (session: TriageSession | null) => void;
  acceptTriageSession: () => void;
  endTriageSession: () => void;
}

export const PatientContext = createContext<PatientContextType | undefined>(undefined);

export const PatientProvider = ({ children }: { children: ReactNode }) => {
  const [activeTriageSession, setActiveTriageSession] = useState<TriageSession | null>(null);

  const acceptTriageSession = () => {
    if (activeTriageSession) {
      setActiveTriageSession({ ...activeTriageSession, status: 'accepted' });
    }
  };

  const endTriageSession = () => {
    setActiveTriageSession(null);
  };

  return (
    <PatientContext.Provider value={{ activeTriageSession, setActiveTriageSession, acceptTriageSession, endTriageSession }}>
      {children}
    </PatientContext.Provider>
  );
};
