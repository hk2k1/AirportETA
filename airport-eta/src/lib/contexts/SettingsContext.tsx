// contexts/SettingsContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDashboardSettings } from '@/hooks/useDashboardSettings';

type SettingsContextType = {
  settings: Record<string, boolean>;
  updateSetting: (key: string, value: boolean) => void;
  loading: boolean;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const { settings: initialSettings, loading } = useDashboardSettings();
  const [settings, setSettings] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!loading) {
      setSettings(initialSettings);
    }
  }, [loading, initialSettings]);

  const updateSetting = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting, loading }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}