import { DashboardConfig } from "@/types/type"


export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Overview",
      href: "/dashboard",
      icon: "home",
    },
    {
      title: "Taxi Maps",
      href: "/dashboard/taxi",
      icon: "taxi",
    },
    {
      title: "Dashboard Settings",
      href: "/dashboard/dashsettings",
      icon: "settings",
    },
    {
      title: "Actions",
      href: "/dashboard/actions",
      icon: "actions",
    },
    {
      title: "Contact List",
      href: "/dashboard/contacts",
      icon: "contacts",
    },
    {
      title: "Reports",
      href: "/dashboard/reports",
      icon: "reports",
    },
    {
      title: "System Parameters",
      href: "/dashboard/system",
      icon: "info",
    },
    {
      title: "Sign Out",
      href: "/signout",
      icon: "logout",
    },
  ],
}