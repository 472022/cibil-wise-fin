import { ReactNode, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  LayoutDashboard, 
  FileText, 
  TrendingUp, 
  Calculator, 
  MessageSquare, 
  User, 
  Bell, 
  LogOut,
  Menu,
  X,
  Clock,
  FolderOpen
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: FileText, label: "Loans", path: "/loans" },
    { icon: TrendingUp, label: "CIBIL Predictor", path: "/cibil-predictor" },
    { icon: Calculator, label: "Insurance", path: "/insurance" },
    { icon: MessageSquare, label: "ChatBot", path: "/chatbot" },
    { icon: Clock, label: "Reminders", path: "/reminders" },
    { icon: FolderOpen, label: "Documents", path: "/documents" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-sm">
        <div className="flex h-16 items-center px-4 gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden"
          >
            {sidebarOpen ? <X /> : <Menu />}
          </Button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg" />
            <span className="font-bold text-xl hidden sm:inline-block">AI CIBIL Store</span>
          </div>

          <div className="flex-1" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-4">
                <h3 className="font-semibold mb-2">Notifications</h3>
                <p className="text-sm text-muted-foreground">No new notifications</p>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">P</AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline-block">Prathamesh</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-16 left-0 z-40 h-[calc(100vh-4rem)] border-r bg-card transition-all duration-300 ${
            sidebarOpen ? "w-64" : "w-0 lg:w-16"
          } overflow-hidden`}
        >
          <nav className="flex flex-col gap-1 p-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "secondary" : "ghost"}
                  className={`justify-start gap-3 ${!sidebarOpen && "lg:justify-center"}`}
                  onClick={() => {
                    navigate(item.path);
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {sidebarOpen && <span>{item.label}</span>}
                </Button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
