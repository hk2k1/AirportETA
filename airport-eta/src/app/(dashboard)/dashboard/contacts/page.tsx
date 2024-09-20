// app/dashboard/contacts/page.tsx
import PageContainer from "@/components/Dashboard/page-container";
import { Breadcrumbs } from "@/components/Dashboard/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "sonner";
import { dashboardConfig } from "@/config/dashboard";
import { KPI } from "./KPI";
import { SOP } from "./SOP";
import { Contact } from "./Contact";

export default function ContactsPage() {
    const NAV_INDEX = 4; // Adjust this based on the position of Contacts in your sidebar nav
    const breadcrumbItems = [
        { title: "Dashboard", link: "/dashboard" },
        { title: dashboardConfig.sidebarNav[NAV_INDEX].title || 'Contacts', link: dashboardConfig.sidebarNav[NAV_INDEX].href || '/dashboard/contacts'},
    ];

    return (
        <PageContainer scrollable={true}>
            <Toaster />
            <div className="space-y-6">
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                        Contact List & SOP 📞
                    </h2>
                </div>

                <Separator className="my-6" />

                <div className="hidden md:block">
                    <Breadcrumbs items={breadcrumbItems} />
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <KPI />
                    <SOP />
                    <Contact />
                </div>
            </div>
        </PageContainer>
    );
}