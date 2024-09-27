"use client";
import React from "react";
import { DashboardNav } from "./dashboard-nav";
import { dashboardConfig } from "@/config/dashboard"
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/useSidebar";
import Link from "next/link";
import { Icons } from "@/components/icons"
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import Img from "next/image";

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();
  const router = useRouter()
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  const handleToggle = () => {
    toggle();
  };

  return (
    <aside
      className={cn(
        `relative hidden h-screen flex-col flex-none border-r bg-gradient-to-b from-sidebarstart to-sidebarend text-white active:text-black transition-[width] duration-500 md:flex`,
        !isMinimized ? "w-60" : "w-[72px]",
        className
      )}
    >
      <div className="hidden p-5 pt-10 lg:block">
        <div className="flex justify-center items-center">
          <Link href={"/"} className="flex items-center space-x-2">
            <Img src="/logo_white.svg" alt="logo" width={100} height={100} className="mx-auto" />
          </Link>
        </div>
      </div>
      <Icons.chevronLeft
        className={cn(
          "absolute -right-3 top-10 z-50  cursor-pointer rounded-full border bg-background text-3xl text-foreground",
          isMinimized && "rotate-180"
        )}
        onClick={handleToggle}
      />
      <div className="flex-grow space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <DashboardNav items={dashboardConfig.sidebarNav} />
          </div>
        </div>
      </div>
      <div className="p-3">
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-black hover:bg-black hover:text-white",
            isMinimized && "px-2"
          )}
          onClick={handleSignOut}
        >
          <Icons.logout className="h-4 w-4 mr-2" />
          {!isMinimized && "Sign Out"}
        </Button>
      </div>
    </aside>
  );
}
