import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Search,
  Phone,
  MapPin,
  Briefcase,
  Star
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Technician {
  id: number;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  status: "available" | "busy" | "offline";
  completedJobs: number;
  rating: number;
}

export function TechniciansManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Mock data - in production, this would come from tRPC
  const technicians: Technician[] = [
    {
      id: 1,
      name: "Mohammed Hassan",
      email: "mohammed@nasayim.com",
      phone: "+971 50 111 2222",
      specialization: "Cleaning",
      status: "available",
      completedJobs: 156,
      rating: 4.8
    },
    {
      id: 2,
      name: "Ali Ahmed",
      email: "ali@nasayim.com",
      phone: "+971 50 333 4444",
      specialization: "Pest Control",
      status: "busy",
      completedJobs: 89,
      rating: 4.6
    },
    {
      id: 3,
      name: "Omar Ibrahim",
      email: "omar@nasayim.com",
      phone: "+971 50 555 6666",
      specialization: "Sanitization",
      status: "available",
      completedJobs: 124,
      rating: 4.9
    }
  ];

  const filteredTechnicians = technicians.filter(tech => {
    const matchesSearch = tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tech.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || tech.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "busy":
        return "bg-orange-100 text-orange-800";
      case "offline":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCreateTechnician = () => {
    toast.info("Create technician form coming soon");
  };

  const handleEditTechnician = (techId: number) => {
    toast.info(`Edit technician ${techId} coming soon`);
  };

  const handleDeleteTechnician = (techId: number) => {
    toast.success(`Technician ${techId} deleted`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Technicians Management</h2>
          <p className="text-muted-foreground">Manage technicians and their assignments</p>
        </div>
        <Button onClick={handleCreateTechnician} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Technician
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-border">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background border-border"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="busy">Busy</option>
              <option value="offline">Offline</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Technicians Grid */}
      {filteredTechnicians.length === 0 ? (
        <Card className="border-border">
          <CardContent className="py-12">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">No technicians found</p>
              <Button onClick={handleCreateTechnician}>Add First Technician</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTechnicians.map((tech) => (
            <Card key={tech.id} className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-foreground">{tech.name}</CardTitle>
                    <CardDescription>ID: #{tech.id}</CardDescription>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tech.status)}`}>
                    {tech.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Briefcase className="w-4 h-4" />
                    <span>{tech.specialization}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${tech.phone}`} className="hover:text-primary transition-colors">
                      {tech.phone}
                    </a>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground">Completed Jobs</p>
                    <p className="text-lg font-bold text-foreground">{tech.completedJobs}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Rating</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <p className="text-lg font-bold text-foreground">{tech.rating}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditTechnician(tech.id)}
                    className="flex-1"
                  >
                    Edit
                  </Button>
                  <button
                    onClick={() => handleDeleteTechnician(tech.id)}
                    className="p-2 hover:bg-destructive/10 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
