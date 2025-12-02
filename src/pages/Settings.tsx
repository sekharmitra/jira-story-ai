import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Save, Key, Cpu, Shield, Users, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const Settings = () => {
  const [baseRubric, setBaseRubric] = useState([
    { id: "clarity", name: "Clarity", weight: 20, enabled: true },
    { id: "completeness", name: "Completeness", weight: 25, enabled: true },
    { id: "acceptance", name: "Acceptance Criteria", weight: 25, enabled: true },
    { id: "testability", name: "Testability", weight: 15, enabled: true },
    { id: "estimation", name: "Estimation Quality", weight: 15, enabled: true },
  ]);
  const [newDimensionName, setNewDimensionName] = useState("");

  const handleAddDimension = () => {
    if (newDimensionName.trim()) {
      const newId = newDimensionName.toLowerCase().replace(/\s+/g, "_");
      setBaseRubric([
        ...baseRubric,
        { id: newId, name: newDimensionName, weight: 10, enabled: true },
      ]);
      setNewDimensionName("");
    }
  };

  const handleRemoveDimension = (id: string) => {
    setBaseRubric(baseRubric.filter((d) => d.id !== id));
  };

  const handleWeightChange = (id: string, value: number[]) => {
    setBaseRubric(
      baseRubric.map((d) => (d.id === id ? { ...d, weight: value[0] } : d))
    );
  };

  const handleToggleDimension = (id: string, enabled: boolean) => {
    setBaseRubric(
      baseRubric.map((d) => (d.id === id ? { ...d, enabled } : d))
    );
  };

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
            <div className="bg-card rounded-xl shadow-custom-md border border-border p-4 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-5 h-5 text-primary" />
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Base Rating Rubric</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Define the default rubric dimensions. Projects can customize these further.
                  </p>
                </div>
              </div>

              <div className="space-y-4 max-w-2xl">
                {baseRubric.map((dimension) => (
                  <div
                    key={dimension.id}
                    className="p-4 border border-border rounded-lg space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Switch
                          checked={dimension.enabled}
                          onCheckedChange={(checked) =>
                            handleToggleDimension(dimension.id, checked)
                          }
                        />
                        <div>
                          <p className="font-medium text-foreground">{dimension.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Weight: {dimension.weight}%
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveDimension(dimension.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    {dimension.enabled && (
                      <Slider
                        value={[dimension.weight]}
                        onValueChange={(value) => handleWeightChange(dimension.id, value)}
                        min={0}
                        max={100}
                        step={5}
                        className="mt-2"
                      />
                    )}
                  </div>
                ))}

                {/* Add New Dimension */}
                <div className="flex gap-2">
                  <Input
                    placeholder="New dimension name..."
                    value={newDimensionName}
                    onChange={(e) => setNewDimensionName(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddDimension()}
                  />
                  <Button
                    onClick={handleAddDimension}
                    variant="outline"
                    className="gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </Button>
                </div>

                <Button className="gradient-primary text-white gap-2 shadow-custom-md mt-6">
                  <Save className="w-4 h-4" />
                  Save Base Rubric
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
