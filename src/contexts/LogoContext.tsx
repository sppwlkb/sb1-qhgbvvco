import React, { createContext, useContext, useState, useEffect } from 'react';

interface LogoContextType {
  logo: string | null;
  updateLogo: (newLogo: string) => void;
}

const LogoContext = createContext<LogoContextType | undefined>(undefined);

export function LogoProvider({ children }: { children: React.ReactNode }) {
  const [logo, setLogo] = useState<string | null>(null);

  useEffect(() => {
    // 從 localStorage 讀取儲存的 logo
    const savedLogo = localStorage.getItem('companyLogo');
    if (savedLogo) {
      setLogo(savedLogo);
    }
  }, []);

  const updateLogo = (newLogo: string) => {
    setLogo(newLogo);
    localStorage.setItem('companyLogo', newLogo);
  };

  return (
    <LogoContext.Provider value={{ logo, updateLogo }}>
      {children}
    </LogoContext.Provider>
  );
}

export function useLogoContext() {
  const context = useContext(LogoContext);
  if (context === undefined) {
    throw new Error('useLogoContext must be used within a LogoProvider');
  }
  return context;
}