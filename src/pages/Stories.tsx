import { Layout } from "@/components/Layout";
import { ScoreBadge } from "@/components/ScoreBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, RefreshCw, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const stories = [
  { key: "ABC-101", summary: "As a user, I want to login with email", score: 85, sprint: "Sprint 6", status: "Done", lastRated: "2 hours ago" },
  { key: "ABC-102", summary: "Implement user profile page", score: 72, sprint: "Sprint 6", status: "In Progress", lastRated: "3 hours ago" },
  { key: "ABC-103", summary: "Add search functionality to dashboard", score: 68, sprint: "Sprint 5", status: "In Progress", lastRated: "5 hours ago" },
  { key: "ABC-104", summary: "Fix bug in payment flow", score: 45, sprint: "Sprint 6", status: "To Do", lastRated: "1 day ago" },
  { key: "ABC-105", summary: "As an admin, I want to manage users", score: 88, sprint: "Sprint 5", status: "Done", lastRated: "2 days ago" },
  { key: "ABC-106", summary: "Create reporting dashboard", score: 55, sprint: "Sprint 6", status: "To Do", lastRated: "3 days ago" },
  { key: "ABC-107", summary: "Integrate third-party analytics", score: 78, sprint: "Sprint 5", status: "In Progress", lastRated: "4 hours ago" },
  { key: "ABC-108", summary: "Update user settings page", score: 42, sprint: "Sprint 6", status: "To Do", lastRated: "1 day ago" },
];

const Stories = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isReratingAll, setIsReratingAll] = useState(false);
  const [reratingStory, setReratingStory] = useState<string | null>(null);

  const handleRerateStory = (storyKey: string) => {
    setReratingStory(storyKey);
    toast({
      title: "Re-rating story",
      description: `Analyzing ${storyKey}...`,
    });
    
    // Simulate AI rating process
    setTimeout(() => {
      setReratingStory(null);
      toast({
        title: "Story re-rated successfully",
        description: `${storyKey} has been analyzed and scored.`,
      });
    }, 2000);
  };

  const handleRerateAll = () => {
    setIsReratingAll(true);
    toast({
      title: "Re-rating all stories",
      description: "This may take a few minutes...",
    });
    
    // Simulate bulk rating process
    setTimeout(() => {
      setIsReratingAll(false);
      toast({
        title: "All stories re-rated",
        description: `Successfully analyzed ${stories.length} stories.`,
      });
    }, 3000);
  };

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">User Stories</h1>
          <p className="text-muted-foreground">View and manage AI-rated user stories</p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl p-6 shadow-custom-md border border-border mb-6">
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
              onClick={handleRerateAll}
              disabled={isReratingAll}
            >
              <RefreshCw className={`w-4 h-4 ${isReratingAll ? 'animate-spin' : ''}`} />
              {isReratingAll ? 'Re-rating...' : 'Re-rate All'}
            </Button>
          </div>

          {/* Active Filters */}
          <div className="flex gap-2 mt-4">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm font-medium">
              Sprint 6
            </span>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm font-medium">
              Score: 40-80
            </span>
          </div>
        </div>

        {/* Stories Table */}
        <div className="bg-card rounded-xl shadow-custom-md border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Story Key</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Summary</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Score</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Sprint</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Last Rated</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {stories.map((story) => (
                  <tr key={story.key} className="hover:bg-muted/30 transition-smooth cursor-pointer">
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm font-medium text-primary">{story.key}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground max-w-md truncate">{story.summary}</td>
                    <td className="px-6 py-4">
                      <ScoreBadge score={story.score} size="sm" />
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{story.sprint}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground">
                        {story.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{story.lastRated}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2"
                          onClick={() => navigate(`/stories/${story.key}`)}
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRerateStory(story.key);
                          }}
                          disabled={reratingStory === story.key}
                        >
                          <RefreshCw className={`w-4 h-4 ${reratingStory === story.key ? 'animate-spin' : ''}`} />
                          {reratingStory === story.key ? 'Rating...' : 'Re-rate'}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-border flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Showing 8 of 127 stories</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Stories;
