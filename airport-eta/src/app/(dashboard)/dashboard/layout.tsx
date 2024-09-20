import Header from "@/components/Dashboard/layout/header";
import Sidebar from "@/components/Dashboard/layout/sidebar";
import { getAuthUser } from "@/utils/supabase-server";
// import { ScrollArea } from "@/components/ui/scroll-area";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "FlightLogger Dashboard",
  description: "Track flight logs",
};

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
      <div className="w-full flex-1 overflow-hidden">
        <Header />
        {children}
      </div>
    </div>
  );
}
