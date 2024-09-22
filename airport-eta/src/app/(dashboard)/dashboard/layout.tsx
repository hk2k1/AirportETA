import Header from "@/components/Dashboard/layout/header";
import Sidebar from "@/components/Dashboard/layout/sidebar";
import { getAuthUser } from "@/utils/supabase-server";
// import { ScrollArea } from "@/components/ui/scroll-area";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Montserrat } from "next/font/google"
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "FlightLogger Dashboard",
  description: "Track flight logs",
};

const font = Montserrat({ weight: "400", subsets: ["latin"], variable: "--font-sans" });

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthUser()

  if (!user) {
    redirect("/login")
  }
  return (
    <div className="flex">
      <Sidebar />
      <div className={cn(
      "w-full flex-1 overflow-hidden",
      font.className,
      font.variable
    )}>
        <Header />
        <Toaster />
        {children}
      </div>
    </div>
  );
}
