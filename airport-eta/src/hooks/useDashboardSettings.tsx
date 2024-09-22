// hooks/useDashboardSettings.ts
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Key must be provided.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export function useDashboardSettings() {
  const [settings, setSettings] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('dashboard_settings')
      .select('key, enabled');

    if (error) {
      console.error('Error fetching settings:', error);
    } else if (data) {
      const settingsObject = data.reduce((acc, item) => {
        acc[item.key] = item.enabled;
        return acc;
      }, {} as Record<string, boolean>);
      setSettings(settingsObject);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return { settings, loading, refetch: fetchSettings };
}