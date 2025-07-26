import React, { createContext, useContext, useState, useEffect } from 'react';

interface ApiKeyContextType {
  userApiKey: string | null;
  setUserApiKey: (key: string | null) => void;
  getApiKey: () => string;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

// No default API key - users must provide their own for security

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
    if (!userApiKey) {
      throw new Error('API key required. Please set your API key in the settings.');
    }
    return userApiKey;
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