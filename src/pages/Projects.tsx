import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Plus, Settings, ExternalLink, TrendingUp } from "lucide-react";

const projects = [
  { 
    name: "E-Commerce Platform", 
    key: "ECOM", 
    stories: 127, 
    avgScore: 78, 
    lastSync: "2 hours ago",
    status: "Active"
  },
  { 
    name: "Mobile App", 
    key: "MOBILE", 
    stories: 89, 
    avgScore: 82, 
    lastSync: "5 hours ago",
    status: "Active"
  },
  { 
    name: "Analytics Dashboard", 
    key: "DASH", 
    stories: 56, 
    avgScore: 75, 
    lastSync: "1 day ago",
    status: "Active"
  },
];

const Projects = () => {
  const navigate = useNavigate();

  const handleAddProject = () => {
    navigate("/project-wizard?mode=add");
  };

  const handleConfigureProject = (project: { name: string; key: string }) => {
    navigate(`/project-wizard?mode=edit&project=${encodeURIComponent(project.name)}&key=${project.key}`);
  };

  return (
    <Layout>
      <div className="p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Projects</h1>
            <p className="text-sm md:text-base text-muted-foreground">Manage your connected Jira projects</p>
          </div>
          <Button onClick={handleAddProject} className="gradient-primary text-white gap-2 shadow-custom-md w-full md:w-auto">
            <Plus className="w-4 h-4" />
            Add Project
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {projects.map((project) => (
            <div key={project.key} className="bg-card rounded-xl shadow-custom-md border border-border p-4 md:p-6 hover:shadow-custom-lg transition-smooth">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-1">{project.name}</h3>
                  <p className="text-sm text-muted-foreground font-mono">{project.key}</p>
                </div>
                <div className="px-2 py-1 bg-success/10 text-success rounded-md text-xs font-medium">
                  {project.status}
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Stories</span>
                  <span className="text-sm font-semibold text-foreground">{project.stories}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Avg Score</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">{project.avgScore}</span>
                    <TrendingUp className="w-4 h-4 text-success" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last Sync</span>
                  <span className="text-sm font-medium text-foreground">{project.lastSync}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Open
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 gap-2"
                  onClick={() => handleConfigureProject({ name: project.name, key: project.key })}
                >
                  <Settings className="w-4 h-4" />
                  Configure
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Onboarding Card */}
        <div className="mt-6 md:mt-8 bg-gradient-light rounded-xl shadow-custom-md border border-border p-6 md:p-8">
          <div className="max-w-2xl">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">Ready to add more projects?</h2>
            <p className="text-sm md:text-base text-muted-foreground mb-6">
              Connect additional Jira projects to expand your AI-powered story rating capabilities. 
              Our 5-step wizard makes integration seamless and quick.
            </p>
            <Button onClick={handleAddProject} className="gradient-primary text-white gap-2 shadow-custom-md w-full md:w-auto">
              <Plus className="w-4 h-4" />
              Start Project Setup
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
