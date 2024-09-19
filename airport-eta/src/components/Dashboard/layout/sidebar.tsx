"use client";
import React from "react";
import { DashboardNav } from "./dashboard-nav";
import { dashboardConfig } from "@/config/dashboard"
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/useSidebar";
import Link from "next/link";
import { Icons } from "@/components/icons"
import { siteConfig } from "@/config/site";

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();

  const handleToggle = () => {
    toggle();
  };

  return (
    <aside
      className={cn(
        `relative  hidden h-screen flex-none border-r bg-card transition-[width] duration-500 md:block`,
        !isMinimized ? "w-72" : "w-[72px]",
        className
      )}
    >
      <div className="hidden p-5 pt-10 pl-5 lg:block">
        <Link href={"/"} className="hidden items-center space-x-2 md:flex">
          <Icons.logo />
          {!isMinimized ? (
            <span className="mr-2 truncate">{siteConfig.name}</span>
          ) : (
            ""
          )}
        </Link>
      </div>
      <Icons.chevronLeft
        className={cn(
          "absolute -right-3 top-10 z-50  cursor-pointer rounded-full border bg-background text-3xl text-foreground",
          isMinimized && "rotate-180"
        )}
        onClick={handleToggle}
      />
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <DashboardNav items={dashboardConfig.sidebarNav} />
          </div>
        </div>
      </div>
    </aside>
  );
}
