import React, { createContext, useContext, useState, useEffect } from 'react';

interface ApiKeyContextType {
  userApiKey: string | null;
  setUserApiKey: (key: string | null) => void;
  getApiKey: () => string;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

const DEFAULT_API_KEY = 'ddc-a4f-4c0658a7764c432c9aa8e4a6d409afb3';

export function ApiKeyProvider({ children }: { children: React.ReactNode }) {
  const [userApiKey, setUserApiKeyState] = useState<string | null>(null);

  // Load API key from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('user-api-key');
    if (stored) {
      setUserApiKeyState(stored);
    }
  }, []);

  const setUserApiKey = (key: string | null) => {
    setUserApiKeyState(key);
    if (key) {
      localStorage.setItem('user-api-key', key);
    } else {
      localStorage.removeItem('user-api-key');
    }
  };

  const getApiKey = () => {
    return userApiKey || DEFAULT_API_KEY;
  };

  return (
    <ApiKeyContext.Provider value={{
      userApiKey,
      setUserApiKey,
      getApiKey
    }}>
      {children}
    </ApiKeyContext.Provider>
  );
}

export function useApiKey() {
  const context = useContext(ApiKeyContext);
  if (context === undefined) {
    throw new Error('useApiKey must be used within an ApiKeyProvider');
  }
  return context;
}