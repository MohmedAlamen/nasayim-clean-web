import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Save,
  Upload,
  Globe,
  Mail,
  Phone,
  MapPin,
  Palette
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function SettingsManagement() {
  const [companyName, setCompanyName] = useState("NASAYIM CLEAN");
  const [email, setEmail] = useState("info@nasayim.com");
  const [phone, setPhone] = useState("+971 50 123 4567");
  const [address, setAddress] = useState("Dubai, UAE");
  const [website, setWebsite] = useState("www.nasayim.com");
  const [theme, setTheme] = useState("light");
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Settings saved successfully");
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast.success(`Logo uploaded: ${file.name}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground">Manage company settings and preferences</p>
      </div>

      {/* Company Logo */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Company Logo</CardTitle>
          <CardDescription>Upload your company logo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
              <span className="text-xs text-muted-foreground">Logo</span>
            </div>
            <div className="flex-1">
              <label className="cursor-pointer">
                <Button variant="outline" className="gap-2" asChild>
                  <span>
                    <Upload className="w-4 h-4" />
                    Upload Logo
                  </span>
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-muted-foreground mt-2">
                Recommended size: 200x200px. Formats: PNG, JPG, SVG
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company Information */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Company Information</CardTitle>
          <CardDescription>Update your company details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Company Name</label>
            <Input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="mt-2 bg-background border-border"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Address
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 bg-background border-border"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Phone Number
            </label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-2 bg-background border-border"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Address
            </label>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-2 bg-background border-border"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Website
            </label>
            <Input
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="mt-2 bg-background border-border"
            />
          </div>
        </CardContent>
      </Card>

      {/* Theme Settings */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Theme Settings
          </CardTitle>
          <CardDescription>Customize the appearance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Dashboard Theme</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full mt-2 px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto (System)</option>
            </select>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              Primary Color: <span className="inline-block w-4 h-4 bg-primary rounded ml-2 align-middle"></span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Notification Settings</CardTitle>
          <CardDescription>Manage notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive email updates</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Order Alerts</p>
              <p className="text-sm text-muted-foreground">Get notified about new orders</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Technician Updates</p>
              <p className="text-sm text-muted-foreground">Receive technician status updates</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSaveSettings}
          disabled={isSaving}
          className="gap-2"
        >
          <Save className="w-4 h-4" />
          {isSaving ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
}
