// app/actions/updateSettings.ts
'use server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Key must be provided.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function updateSettings(settings: Record<string, boolean>) {
  const updates = Object.entries(settings).map(([key, enabled]) => ({
    key,
    enabled,
  }))

  const { error } = await supabase
    .from('dashboard_settings')
    .upsert(updates, { onConflict: 'key' })

  if (error) {
    console.error('Error updating settings:', error)
    throw new Error('Failed to update settings')
  }

  return { success: true }
}