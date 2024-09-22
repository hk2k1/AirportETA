// components/Disable.tsx
import React from 'react';
import { useDashboardSettings } from '@/hooks/useDashboardSettings';

interface DisableProps {
  settingKey: string;
  children: React.ReactNode;
}

export function Disable({ settingKey, children }: DisableProps) {
  const { settings } = useDashboardSettings();

  if (settings[settingKey]) {
    return <>{children}</>;
  }

  return null;
}