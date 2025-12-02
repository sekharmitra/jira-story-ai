import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft, ChevronRight, Check, Upload, Plus, Trash2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const steps = [
  { id: 1, title: "Connect Jira" },
  { id: 2, title: "Select Projects" },
  { id: 3, title: "Field Mapping" },
  { id: 4, title: "Rating Rubric" },
  { id: 5, title: "Domain Context" },
];

const rubricDimensions = [
  { id: "clarity", name: "Clarity", defaultWeight: 20 },
  { id: "completeness", name: "Completeness", defaultWeight: 25 },
  { id: "acceptance", name: "Acceptance Criteria", defaultWeight: 25 },
  { id: "testability", name: "Testability", defaultWeight: 15 },
  { id: "estimation", name: "Estimation Quality", defaultWeight: 15 },
];

const fieldMappings = [
  { field: "Description", jiraField: "description", required: true },
  { field: "Acceptance Criteria", jiraField: "customfield_10001", required: true },
  { field: "Story Points", jiraField: "customfield_10002", required: false },
  { field: "Epic Link", jiraField: "customfield_10003", required: false },
];

export default function ProjectWizardPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = (searchParams.get("mode") as "add" | "edit") || "add";
  const projectName = searchParams.get("project") || "";
  const projectKey = searchParams.get("key") || "";

  const [currentStep, setCurrentStep] = useState(1);
  const [jiraUrl, setJiraUrl] = useState("");
  const [apiToken, setApiToken] = useState("");
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [domainContext, setDomainContext] = useState("");
  const [rubricConfig, setRubricConfig] = useState(
    rubricDimensions.map((d) => ({ ...d, enabled: true, weight: d.defaultWeight }))
  );
  const [newDimensionName, setNewDimensionName] = useState("");
  const { toast } = useToast();

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleComplete = () => {
    toast({
      title: mode === "add" ? "Project Added" : "Project Updated",
      description: `Successfully ${mode === "add" ? "connected" : "updated"} your Jira project.`,
    });
    navigate("/projects");
  };

  const handleCancel = () => {
    navigate("/projects");
  };

  const handleWeightChange = (id: string, value: number[]) => {
    setRubricConfig((prev) =>
      prev.map((item) => (item.id === id ? { ...item, weight: value[0] } : item))
    );
  };

  const handleToggleDimension = (id: string, enabled: boolean) => {
    setRubricConfig((prev) =>
      prev.map((item) => (item.id === id ? { ...item, enabled } : item))
    );
  };

  const handleAddDimension = () => {
    if (newDimensionName.trim()) {
      const newId = newDimensionName.toLowerCase().replace(/\s+/g, "_");
      setRubricConfig([
        ...rubricConfig,
        { id: newId, name: newDimensionName, defaultWeight: 10, weight: 10, enabled: true },
      ]);
      setNewDimensionName("");
    }
  };

  const handleRemoveDimension = (id: string) => {
    setRubricConfig(rubricConfig.filter((item) => item.id !== id));
  };

  return (
    <Layout>
      <div className="p-4 md:p-6 lg:p-8">
        {/* Header with Back Button */}
        <div className="mb-8">
          <Button variant="ghost" onClick={handleCancel} className="gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Button>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {mode === "add" ? "Add New Project" : `Configure ${projectName}`}
            </h1>
            <p className="text-muted-foreground">
              {mode === "add"
                ? "Connect and configure a new Jira project for AI-powered story rating"
                : "Update your project configuration"}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-card rounded-xl shadow-custom-md border border-border p-4 md:p-6 lg:p-8">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-8 overflow-x-auto pb-4">
            {steps.map((step, idx) => (
              <div key={step.id} className="flex items-center flex-1 min-w-max md:min-w-0">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-smooth flex-shrink-0 ${
                      currentStep > step.id
                        ? "bg-primary text-primary-foreground"
                        : currentStep === step.id
                        ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                  </div>
                  <span className="text-xs mt-2 text-center text-muted-foreground font-medium max-w-[80px]">
                    {step.title}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 transition-smooth mx-1 md:mx-2 ${
                      currentStep > step.id ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="min-h-[400px] mb-8">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Connect to Jira</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Enter your Jira instance details to establish the connection.
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="jira-url">Jira Instance URL</Label>
                    <Input
                      id="jira-url"
                      placeholder="https://your-domain.atlassian.net"
                      value={jiraUrl}
                      onChange={(e) => setJiraUrl(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="api-token">API Token</Label>
                    <Input
                      id="api-token"
                      type="password"
                      placeholder="Enter your Jira API token"
                      value={apiToken}
                      onChange={(e) => setApiToken(e.target.value)}
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Generate an API token from your Atlassian account settings
                    </p>
                  </div>
                  <Button variant="outline" className="w-full gap-2">
                    Test Connection
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Select Projects</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Choose which Jira projects you want to analyze and rate.
                  </p>
                </div>
                <div className="space-y-3">
                  {["E-Commerce Platform (ECOM)", "Mobile App (MOBILE)", "Analytics Dashboard (DASH)", "Customer Portal (PORTAL)", "Admin Console (ADMIN)"].map((proj) => (
                    <label
                      key={proj}
                      className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-smooth"
                    >
                      <input
                        type="checkbox"
                        checked={selectedProjects.includes(proj)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedProjects([...selectedProjects, proj]);
                          } else {
                            setSelectedProjects(selectedProjects.filter((p) => p !== proj));
                          }
                        }}
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-medium text-foreground">{proj}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Field Mapping</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Map your Jira custom fields to our rating dimensions.
                  </p>
                </div>
                <div className="space-y-4">
                  {fieldMappings.map((mapping) => (
                    <div key={mapping.field} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                      <div>
                        <Label className="text-sm font-medium text-foreground">
                          {mapping.field}
                          {mapping.required && <span className="text-destructive ml-1">*</span>}
                        </Label>
                      </div>
                      <Input
                        defaultValue={mapping.jiraField}
                        placeholder="Jira field ID"
                        className="font-mono text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Project-Specific Rubric
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Customize rubric dimensions for this project. You can add custom dimensions or
                    remove existing ones.
                  </p>
                  <p className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-md border border-border">
                    💡 These are based on your base rubric from Settings. Changes here only affect
                    this project.
                  </p>
                </div>
                <div className="space-y-4">
                  {rubricConfig.map((dimension) => (
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
                          <Label className="text-sm font-semibold text-foreground">
                            {dimension.name}
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-primary">
                            {dimension.weight}%
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveDimension(dimension.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      {dimension.enabled && (
                        <Slider
                          value={[dimension.weight]}
                          onValueChange={(value) => handleWeightChange(dimension.id, value)}
                          min={0}
                          max={100}
                          step={5}
                        />
                      )}
                    </div>
                  ))}

                  {/* Add Custom Dimension */}
                  <div className="flex gap-2 pt-2">
                    <Input
                      placeholder="Add custom dimension..."
                      value={newDimensionName}
                      onChange={(e) => setNewDimensionName(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleAddDimension()}
                    />
                    <Button onClick={handleAddDimension} variant="outline" className="gap-2">
                      <Plus className="w-4 h-4" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Domain Context</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Provide domain-specific context to improve AI rating accuracy.
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="domain-context">Domain Description & Glossary</Label>
                    <Textarea
                      id="domain-context"
                      placeholder="Describe your product domain, technical context, and any domain-specific terminology..."
                      value={domainContext}
                      onChange={(e) => setDomainContext(e.target.value)}
                      rows={8}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Upload Sample Stories (Optional)</Label>
                    <div className="mt-2 border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-smooth cursor-pointer">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Drop files here or click to upload
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        CSV, JSON, or TXT files with example user stories
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-border gap-4">
            <div className="order-2 sm:order-1 w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="gap-2 w-full sm:w-auto"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
            </div>
            <div className="order-1 sm:order-2 text-sm text-muted-foreground">
              Step {currentStep} of {steps.length}
            </div>
            <div className="order-3 w-full sm:w-auto flex gap-2">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="flex-1 sm:flex-none"
              >
                Cancel
              </Button>
              {currentStep < 5 ? (
                <Button onClick={handleNext} className="flex-1 sm:flex-none gap-2">
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button onClick={handleComplete} className="flex-1 sm:flex-none gap-2">
                  <Check className="w-4 h-4" />
                  Complete
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
