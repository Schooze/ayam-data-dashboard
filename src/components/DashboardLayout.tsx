import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { FarmSidebar } from "./FarmSidebar"
import { ReactNode } from "react"

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        {/* Fixed header with trigger */}
        <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-card border-b border-border flex items-center px-4 shadow-sm">
          <SidebarTrigger className="text-foreground hover:bg-muted rounded-lg p-2 transition-colors" />
          <div className="ml-4">
            <h1 className="font-semibold text-foreground">Chicken Farm Monitoring</h1>
          </div>
        </header>

        <FarmSidebar />

        {/* Main content area */}
        <main className="flex-1 pt-14 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}