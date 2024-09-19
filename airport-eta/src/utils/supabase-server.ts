'use server'

import { createClient } from "@/utils/supabase/server"

export async function getAuthUser() {
    const supabase = createClient()
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      return user
    } catch (error) {
      console.error("Error:", error)
      return null
    }
  }
  