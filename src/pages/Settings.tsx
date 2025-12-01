import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Key, Cpu, Shield, Users } from "lucide-react";

const Settings = () => {
  return (
    <Layout>
      <div className="p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your application configuration</p>
        </div>

        <Tabs defaultValue="api" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 max-w-2xl">
            <TabsTrigger value="api" className="text-xs md:text-sm">API Keys</TabsTrigger>
            <TabsTrigger value="model" className="text-xs md:text-sm">LLM Model</TabsTrigger>
            <TabsTrigger value="rubric" className="text-xs md:text-sm">Rubric</TabsTrigger>
            <TabsTrigger value="users" className="text-xs md:text-sm">Users</TabsTrigger>
          </TabsList>

          {/* API Keys */}
          <TabsContent value="api">
          <div className="bg-card rounded-xl shadow-custom-md border border-border p-4 md:p-6">
              <div className="flex items-center gap-3 mb-6">
                <Key className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">API Configuration</h2>
              </div>

              <div className="space-y-6 max-w-2xl">
                <div className="space-y-2">
                  <Label htmlFor="jira-url">Jira Instance URL</Label>
                  <Input
                    id="jira-url"
                    placeholder="https://your-domain.atlassian.net"
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jira-token">Jira API Token</Label>
                  <Input
                    id="jira-token"
                    type="password"
                    placeholder="Enter your Jira API token"
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="openai-key">OpenAI API Key</Label>
                  <Input
                    id="openai-key"
                    type="password"
                    placeholder="sk-..."
                    className="h-12"
                  />
                </div>

                <Button className="gradient-primary text-white gap-2 shadow-custom-md">
                  <Save className="w-4 h-4" />
                  Save API Keys
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* LLM Model */}
          <TabsContent value="model">
          <div className="bg-card rounded-xl shadow-custom-md border border-border p-4 md:p-6">
              <div className="flex items-center gap-3 mb-6">
                <Cpu className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">LLM Model Selection</h2>
              </div>

              <div className="space-y-4 max-w-2xl">
                <div className="p-4 border border-border rounded-lg hover:border-primary transition-smooth cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground">GPT-4</h3>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium">
                      Recommended
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Most accurate, best for complex stories</p>
                </div>

                <div className="p-4 border border-border rounded-lg hover:border-primary transition-smooth cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground">GPT-3.5 Turbo</h3>
                    <span className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs font-medium">
                      Faster
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Good balance of speed and accuracy</p>
                </div>

                <div className="p-4 border border-border rounded-lg hover:border-primary transition-smooth cursor-pointer opacity-50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground">Claude 2</h3>
                    <span className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs font-medium">
                      Coming Soon
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Alternative provider option</p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Rubric */}
          <TabsContent value="rubric">
            <div className="bg-card rounded-xl shadow-custom-md border border-border p-6">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Rating Rubric Configuration</h2>
              </div>

              <div className="space-y-4 max-w-2xl">
                {[
                  { name: "Clarity", weight: 25, enabled: true },
                  { name: "Completeness", weight: 20, enabled: true },
                  { name: "Acceptance Criteria", weight: 25, enabled: true },
                  { name: "Testability", weight: 15, enabled: true },
                  { name: "Independence", weight: 15, enabled: true },
                ].map((dimension) => (
                  <div key={dimension.name} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Switch checked={dimension.enabled} />
                      <div>
                        <p className="font-medium text-foreground">{dimension.name}</p>
                        <p className="text-sm text-muted-foreground">Weight: {dimension.weight}%</p>
                      </div>
                    </div>
                    <Input
                      type="number"
                      value={dimension.weight}
                      className="w-20"
                      min="0"
                      max="100"
                    />
                  </div>
                ))}

                <Button className="gradient-primary text-white gap-2 shadow-custom-md mt-6">
                  <Save className="w-4 h-4" />
                  Save Rubric
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Users */}
          <TabsContent value="users">
            <div className="bg-card rounded-xl shadow-custom-md border border-border p-6">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">User Management</h2>
              </div>

              <div className="space-y-4">
                {[
                  { name: "John Doe", email: "john@company.com", role: "Admin" },
                  { name: "Jane Smith", email: "jane@company.com", role: "Editor" },
                  { name: "Bob Johnson", email: "bob@company.com", role: "Viewer" },
                ].map((user) => (
                  <div key={user.email} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-md text-sm font-medium">
                        {user.role}
                      </span>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                ))}
              </div>

              <Button className="gradient-primary text-white gap-2 shadow-custom-md mt-6">
                <Users className="w-4 h-4" />
                Invite User
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
