// import { redirect } from "next/navigation"

// import { getAuthUser } from "@/utils/supabase-server"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  // const user = await getAuthUser()

  // if (user) {
  //   redirect("/dashboard")
  // }
  return <div className="min-h-screen">{children}</div>
}