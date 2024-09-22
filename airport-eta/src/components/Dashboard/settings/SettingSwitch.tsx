// components/Dashboard/settings/SettingSwitch.tsx
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useSettings } from '@/lib/contexts/SettingsContext';

interface SettingSwitchProps {
  settingKey: string;
  label: string;
}

export function SettingSwitch({ settingKey, label }: SettingSwitchProps) {
  const { settings, updateSetting } = useSettings();

  return (
    <div className="flex items-center justify-between">
      <Label htmlFor={settingKey}>{label}</Label>
      <Switch
        id={settingKey}
        checked={settings[settingKey] as boolean}
        onCheckedChange={(checked) => updateSetting(settingKey, checked)}
      />
    </div>
  );
}