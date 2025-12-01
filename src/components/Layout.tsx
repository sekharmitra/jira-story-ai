import { ReactNode, useState } from "react";
import { NavLink } from "@/components/NavLink";
import { LayoutDashboard, FileText, FolderKanban, Settings, LogOut, BarChart3, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { title: "Stories", path: "/stories", icon: FileText },
  { title: "Projects", path: "/projects", icon: FolderKanban },
  { title: "Analytics", path: "/analytics", icon: BarChart3 },
  { title: "Settings", path: "/settings", icon: Settings },
];

export const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-card shadow-custom-md"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-40",
        "w-64 bg-card border-r border-border flex flex-col shadow-custom-md",
        "transform transition-transform duration-300 ease-in-out",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-custom-md">
              <BarChart3 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">AI Story Rating</h1>
              <p className="text-xs text-muted-foreground">for Jira</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              activeClassName="bg-primary/10 text-primary font-medium hover:bg-primary/15"
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-border">
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth text-muted-foreground hover:bg-muted hover:text-foreground w-full">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto lg:ml-0 pt-16 lg:pt-0">
        {children}
      </main>
    </div>
  );
};
