import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  TrendingUp,
  Clock,
  CheckCircle2,
  DollarSign
} from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export default function Dashboard() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const logoutMutation = trpc.auth.logout.useMutation();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      toast.success("Logged out successfully");
      window.location.href = "/";
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const menuItems = [
    {
      id: "overview",
      label: "Overview",
      icon: LayoutDashboard,
      roles: ["admin", "manager", "technician"]
    },
    {
      id: "orders",
      label: "Orders",
      icon: Briefcase,
      roles: ["admin", "manager"]
    },
    {
      id: "customers",
      label: "Customers",
      icon: Users,
      roles: ["admin", "manager"]
    },
    {
      id: "technicians",
      label: "Technicians",
      icon: Users,
      roles: ["admin", "manager"]
    },
    {
      id: "services",
      label: "Services",
      icon: Briefcase,
      roles: ["admin"]
    },
    {
      id: "users",
      label: "Users & Roles",
      icon: Users,
      roles: ["admin"]
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      roles: ["admin"]
    }
  ];

  const visibleMenuItems = menuItems.filter(item => 
    item.roles.includes(user?.role as string)
  );

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? "w-64" : "w-20"} bg-muted border-r border-border transition-all duration-300 flex flex-col`}>
          {/* Logo */}
          <div className="h-16 border-b border-border flex items-center justify-between px-4">
            {sidebarOpen && (
              <Link href="/">
                <div className="flex items-center gap-2 cursor-pointer">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">NC</span>
                  </div>
                  <span className="font-bold text-foreground text-sm">NASAYIM</span>
                </div>
              </Link>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1 hover:bg-muted-foreground/10 rounded-lg transition-colors"
            >
              {sidebarOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {visibleMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted-foreground/10"
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            ))}
          </nav>

          {/* User Section */}
          <div className="border-t border-border p-4 space-y-2">
            {sidebarOpen && (
              <div className="px-3 py-2 rounded-lg bg-muted-foreground/10">
                <p className="text-xs font-semibold text-foreground">Logged in as</p>
                <p className="text-sm font-medium text-foreground truncate">{user?.email}</p>
                <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
              </div>
            )}
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="w-full justify-start"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {sidebarOpen && "Logout"}
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {/* Top Bar */}
          <div className="h-16 border-b border-border bg-background/95 backdrop-blur flex items-center justify-between px-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Welcome, {user?.name || user?.email}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === "overview" && <OverviewTab />}
            {activeTab === "orders" && <OrdersTab />}
            {activeTab === "customers" && <CustomersTab />}
            {activeTab === "technicians" && <TechniciansTab />}
            {activeTab === "services" && <ServicesTab />}
            {activeTab === "users" && <UsersTab />}
            {activeTab === "settings" && <SettingsTab />}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { icon: TrendingUp, label: "Total Orders", value: "124", color: "text-blue-500" },
          { icon: Clock, label: "Active Jobs", value: "12", color: "text-orange-500" },
          { icon: CheckCircle2, label: "Completed", value: "98", color: "text-green-500" },
          { icon: DollarSign, label: "Revenue", value: "$24,500", color: "text-purple-500" }
        ].map((stat, idx) => (
          <Card key={idx} className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">{stat.label}</CardTitle>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function OrdersTab() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Orders Management</CardTitle>
        <CardDescription>Manage and track all service orders</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">Orders management coming soon</p>
          <Button>Create New Order</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function CustomersTab() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Customers Management</CardTitle>
        <CardDescription>Manage customer profiles and information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">Customers management coming soon</p>
          <Button>Add New Customer</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function TechniciansTab() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Technicians Management</CardTitle>
        <CardDescription>Manage technicians and their assignments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">Technicians management coming soon</p>
          <Button>Add New Technician</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ServicesTab() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Services Management</CardTitle>
        <CardDescription>Manage services and pricing</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">Services management coming soon</p>
          <Button>Add New Service</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function UsersTab() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Users & Roles</CardTitle>
        <CardDescription>Manage staff users and their roles</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">Users management coming soon</p>
          <Button>Add New User</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function SettingsTab() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Settings</CardTitle>
        <CardDescription>Manage company settings and preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">Settings management coming soon</p>
          <Button>Edit Settings</Button>
        </div>
      </CardContent>
    </Card>
  );
}
