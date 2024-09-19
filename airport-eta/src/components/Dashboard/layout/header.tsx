import ThemeToggle from "@/components/Dashboard/theme-toggle";
import { cn } from "@/lib/utils";
import { MobileSidebar } from "./mobile-sidebar";
import { UserAccountNav } from "./user-account-nav"
import { getAuthUser } from "@/utils/supabase-server";
import { redirect } from "next/navigation";

export default async function Header() {
  const user = await getAuthUser()

  if (!user) {
    redirect("/login")
  }
  
  return (
    <header className="sticky inset-x-0 top-0 w-full">
      <nav className="flex items-center justify-between px-4 py-2 md:justify-end">
        <div className={cn("block lg:!hidden")}>
          <MobileSidebar />
        </div>
        <div className="flex items-center gap-2">
          <UserAccountNav
              user={{
                name: user.user_metadata.full_name,
                image: user.user_metadata.avatar_url,
                email: user.email,
              }}
            />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
