import { Layout } from "@/components/Layout";
import { ScoreBadge } from "@/components/ScoreBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, RefreshCw, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

type Story = {
  key: string;
  summary: string;
  score: number;
  sprint: string;
  status: string;
  lastRated: string;
};

const projects = [
  { key: "ECOM", name: "E-Commerce Platform" },
  { key: "MOBILE", name: "Mobile App" },
  { key: "DASH", name: "Analytics Dashboard" },
  { key: "PORTAL", name: "Customer Portal" },
];

const storiesByProject: Record<string, Story[]> = {
  "ECOM": [
    { key: "ECOM-101", summary: "As a user, I want to login with email", score: 85, sprint: "Sprint 6", status: "Done", lastRated: "2 hours ago" },
    { key: "ECOM-102", summary: "Implement user profile page", score: 72, sprint: "Sprint 6", status: "In Progress", lastRated: "3 hours ago" },
    { key: "ECOM-103", summary: "Add search functionality to dashboard", score: 68, sprint: "Sprint 5", status: "In Progress", lastRated: "5 hours ago" },
    { key: "ECOM-104", summary: "Fix bug in payment flow", score: 45, sprint: "Sprint 6", status: "To Do", lastRated: "1 day ago" },
  ],
  "MOBILE": [
    { key: "MOBILE-101", summary: "As an admin, I want to manage users", score: 88, sprint: "Sprint 5", status: "Done", lastRated: "2 days ago" },
    { key: "MOBILE-102", summary: "Create reporting dashboard", score: 55, sprint: "Sprint 6", status: "To Do", lastRated: "3 days ago" },
    { key: "MOBILE-103", summary: "Integrate third-party analytics", score: 78, sprint: "Sprint 5", status: "In Progress", lastRated: "4 hours ago" },
  ],
  "DASH": [
    { key: "DASH-101", summary: "Update user settings page", score: 42, sprint: "Sprint 6", status: "To Do", lastRated: "1 day ago" },
    { key: "DASH-102", summary: "Add real-time data updates", score: 91, sprint: "Sprint 7", status: "Done", lastRated: "1 hour ago" },
  ],
  "PORTAL": [
    { key: "PORTAL-101", summary: "Implement customer feedback form", score: 76, sprint: "Sprint 5", status: "In Progress", lastRated: "6 hours ago" },
  ],
};

const Stories = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedProject, setSelectedProject] = useState<string>("ECOM");
  const [isEvaluatingAll, setIsEvaluatingAll] = useState(false);
  const [evaluatingStory, setEvaluatingStory] = useState<string | null>(null);
  
  const currentStories = storiesByProject[selectedProject] || [];

  const handleEvaluateStory = (storyKey: string) => {
    setEvaluatingStory(storyKey);
    toast({
      title: "Evaluating story",
      description: `Analyzing ${storyKey}...`,
    });
    
    setTimeout(() => {
      setEvaluatingStory(null);
      toast({
        title: "Story evaluated successfully",
        description: `${storyKey} has been analyzed and scored.`,
      });
    }, 2000);
  };

  const handleEvaluateAll = () => {
    setIsEvaluatingAll(true);
    toast({
      title: "Evaluating all stories",
      description: "This may take a few minutes...",
    });
    
    setTimeout(() => {
      setIsEvaluatingAll(false);
      toast({
        title: "All stories evaluated",
        description: `Successfully analyzed ${currentStories.length} stories.`,
      });
    }, 3000);
  };

  return (
    <Layout>
      <div className="p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">User Stories</h1>
              <p className="text-sm md:text-base text-muted-foreground">View and manage AI-rated user stories</p>
            </div>
            <div className="w-full md:w-64">
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger className="h-12 bg-card border-border">
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.key} value={project.key}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl p-4 md:p-6 shadow-custom-md border border-border mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search stories..."
                  className="pl-10 h-12"
                />
              </div>
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
            <Button 
              className="gradient-primary text-white gap-2 shadow-custom-md"
              onClick={handleEvaluateAll}
              disabled={isEvaluatingAll}
            >
              <RefreshCw className={`w-4 h-4 ${isEvaluatingAll ? 'animate-spin' : ''}`} />
              {isEvaluatingAll ? 'Evaluating...' : 'Evaluate All'}
            </Button>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-xs md:text-sm font-medium">
              Sprint 6
            </span>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-xs md:text-sm font-medium">
              Score: 40-80
            </span>
          </div>
        </div>

        {/* Stories Table */}
        <div className="bg-card rounded-xl shadow-custom-md border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[768px]">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-foreground">Story Key</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-foreground">Summary</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-foreground">Score</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-foreground hidden lg:table-cell">Sprint</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-foreground hidden md:table-cell">Status</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-foreground hidden xl:table-cell">Last Rated</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-right text-xs md:text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {currentStories.map((story) => (
                  <tr key={story.key} className="hover:bg-muted/30 transition-smooth cursor-pointer">
                    <td className="px-3 md:px-6 py-3 md:py-4">
                      <span className="font-mono text-xs md:text-sm font-medium text-primary">{story.key}</span>
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-foreground max-w-xs truncate">{story.summary}</td>
                    <td className="px-3 md:px-6 py-3 md:py-4">
                      <ScoreBadge score={story.score} size="sm" />
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-muted-foreground hidden lg:table-cell">{story.sprint}</td>
                    <td className="px-3 md:px-6 py-3 md:py-4 hidden md:table-cell">
                      <span className="px-2 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground">
                        {story.status}
                      </span>
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-muted-foreground hidden xl:table-cell">{story.lastRated}</td>
                    <td className="px-3 md:px-6 py-3 md:py-4 text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2 text-xs"
                          onClick={() => navigate(`/stories/${story.key}`)}
                        >
                          <Eye className="w-3 md:w-4 h-3 md:h-4" />
                          <span className="hidden sm:inline">View</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-2 text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEvaluateStory(story.key);
                          }}
                          disabled={evaluatingStory === story.key}
                        >
                          <RefreshCw className={`w-3 md:w-4 h-3 md:h-4 ${evaluatingStory === story.key ? 'animate-spin' : ''}`} />
                          <span className="hidden sm:inline">{evaluatingStory === story.key ? 'Evaluating...' : 'Evaluate'}</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-4 md:px-6 py-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs md:text-sm text-muted-foreground">
              Showing {currentStories.length} {currentStories.length === 1 ? 'story' : 'stories'}
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-xs">Previous</Button>
              <Button variant="outline" size="sm" className="text-xs">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Stories;
