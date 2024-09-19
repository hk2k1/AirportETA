import Header from "@/components/Dashboard/layout/header";
import Sidebar from "@/components/Dashboard/layout/sidebar";
// import { ScrollArea } from "@/components/ui/scroll-area";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FlightLogger Dashboard",
  description: "Track flight logs",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
