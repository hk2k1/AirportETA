
import { createClient } from "@/utils/supabase/server"
import { useRouter } from "next/navigation"

export async function GET() {
    const router = useRouter()
    const supabase = createClient();
    await supabase.auth.signOut()
    router.refresh()
}