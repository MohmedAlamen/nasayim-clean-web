import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Search,
  DollarSign,
  Clock
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Service {
  id: number;
  name: string;
  category: "cleaning" | "pest_control" | "sanitization";
  description: string;
  basePrice: number;
  duration: number; // in hours
  isActive: boolean;
}

export function ServicesManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Mock data - in production, this would come from tRPC
  const services: Service[] = [
    {
      id: 1,
      name: "Office Cleaning",
      category: "cleaning",
      description: "Professional office cleaning including desks, floors, and common areas",
      basePrice: 250,
      duration: 3,
      isActive: true
    },
    {
      id: 2,
      name: "Residential Cleaning",
      category: "cleaning",
      description: "Complete home cleaning service for residential properties",
      basePrice: 180,
      duration: 2,
      isActive: true
    },
    {
      id: 3,
      name: "Pest Control",
      category: "pest_control",
      description: "Comprehensive pest control and prevention service",
      basePrice: 320,
      duration: 2,
      isActive: true
    },
    {
      id: 4,
      name: "Deep Sanitization",
      category: "sanitization",
      description: "Deep cleaning and sanitization with disinfectants",
      basePrice: 450,
      duration: 4,
      isActive: true
    }
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || service.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "cleaning":
        return "Cleaning";
      case "pest_control":
        return "Pest Control";
      case "sanitization":
        return "Sanitization";
      default:
        return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "cleaning":
        return "bg-blue-100 text-blue-800";
      case "pest_control":
        return "bg-red-100 text-red-800";
      case "sanitization":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCreateService = () => {
    toast.info("Create service form coming soon");
  };

  const handleEditService = (serviceId: number) => {
    toast.info(`Edit service ${serviceId} coming soon`);
  };

  const handleDeleteService = (serviceId: number) => {
    toast.success(`Service ${serviceId} deleted`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Services Management</h2>
          <p className="text-muted-foreground">Manage services and pricing</p>
        </div>
        <Button onClick={handleCreateService} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Service
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-border">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background border-border"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm"
            >
              <option value="all">All Categories</option>
              <option value="cleaning">Cleaning</option>
              <option value="pest_control">Pest Control</option>
              <option value="sanitization">Sanitization</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Services Table */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Services List</CardTitle>
          <CardDescription>Total: {filteredServices.length} services</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredServices.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No services found</p>
              <Button onClick={handleCreateService}>Add First Service</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="flex items-start justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-foreground">{service.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(service.category)}`}>
                        {getCategoryLabel(service.category)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">${service.basePrice}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">{service.duration}h</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEditService(service.id)}
                      className="p-2 hover:bg-primary/10 rounded transition-colors"
                    >
                      <Edit2 className="w-4 h-4 text-primary" />
                    </button>
                    <button
                      onClick={() => handleDeleteService(service.id)}
                      className="p-2 hover:bg-destructive/10 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
