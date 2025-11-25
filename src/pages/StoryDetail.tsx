import { Layout } from "@/components/Layout";
import { ScoreBadge } from "@/components/ScoreBadge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, ExternalLink, Sparkles, CheckCircle2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const dimensions = [
  { name: "Clarity", score: 85, weight: 25 },
  { name: "Completeness", score: 72, weight: 20 },
  { name: "Acceptance Criteria", score: 65, weight: 25 },
  { name: "Testability", score: 78, weight: 15 },
  { name: "Independence", score: 88, weight: 15 },
];

const improvements = [
  "Add specific acceptance criteria for error handling scenarios",
  "Define edge cases for the login flow",
  "Include performance requirements (e.g., login should complete within 2 seconds)",
  "Specify security requirements for password handling",
  "Add accessibility requirements for screen readers",
];

const StoryDetail = () => {
  const navigate = useNavigate();
  const { storyKey } = useParams();
  const { toast } = useToast();
  const [showComparison, setShowComparison] = useState(false);
  const [isRerating, setIsRerating] = useState(false);

  const overallScore = 78;

  const handleRerate = () => {
    setIsRerating(true);
    toast({
      title: "Re-rating story",
      description: `Analyzing ${storyKey || "story"}...`,
    });
    
    setTimeout(() => {
      setIsRerating(false);
      toast({
        title: "Story re-rated successfully",
        description: `${storyKey || "Story"} has been analyzed and scored.`,
      });
    }, 2000);
  };

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate("/stories")} className="gap-2 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Stories
          </Button>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{storyKey || "ABC-101"}</h1>
              <p className="text-muted-foreground">AI Rating Analysis</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <ExternalLink className="w-4 h-4" />
                Open in Jira
              </Button>
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={handleRerate}
                disabled={isRerating}
              >
                <RefreshCw className={`w-4 h-4 ${isRerating ? 'animate-spin' : ''}`} />
                {isRerating ? 'Re-rating...' : 'Re-rate Story'}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Story Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Story Overview */}
            <div className="bg-card rounded-xl shadow-custom-md border border-border p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Story Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Summary</label>
                  <p className="text-foreground mt-1">As a user, I want to login with email and password</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Description</label>
                  <p className="text-foreground mt-1 leading-relaxed">
                    Users should be able to authenticate themselves using their email address and password. 
                    The system should validate credentials and provide appropriate feedback for successful 
                    and failed login attempts.
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Acceptance Criteria</label>
                  <ul className="mt-2 space-y-2">
                    <li className="flex items-start gap-2 text-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></span>
                      <span>User can enter email and password</span>
                    </li>
                    <li className="flex items-start gap-2 text-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></span>
                      <span>System validates credentials</span>
                    </li>
                    <li className="flex items-start gap-2 text-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></span>
                      <span>Error message shown for invalid credentials</span>
                    </li>
                  </ul>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Story Points</label>
                    <p className="text-foreground font-semibold mt-1">5</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Sprint</label>
                    <p className="text-foreground font-semibold mt-1">Sprint 6</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <p className="text-foreground font-semibold mt-1">In Progress</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Improvement Suggestions */}
            <div className="bg-card rounded-xl shadow-custom-md border border-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">AI Improvement Suggestions</h2>
              </div>
              
              <div className="space-y-3">
                {improvements.map((improvement, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-smooth">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-foreground text-sm leading-relaxed">{improvement}</p>
                  </div>
                ))}
              </div>

              <Button 
                className="w-full mt-6 gradient-primary text-white gap-2 shadow-custom-md"
                onClick={() => setShowComparison(true)}
              >
                <Sparkles className="w-4 h-4" />
                Generate Improved Story
              </Button>
            </div>
          </div>

          {/* Right Column - Rating Panel */}
          <div className="space-y-6">
            {/* Overall Score */}
            <div className="bg-card rounded-xl shadow-custom-md border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Overall Quality Score</h3>
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="hsl(var(--muted))"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="hsl(var(--primary))"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - overallScore / 100)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold text-foreground">{overallScore}</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <ScoreBadge score={overallScore} size="lg" className="mb-2" />
                <p className="text-sm text-muted-foreground">Good story quality</p>
              </div>
            </div>

            {/* Dimension Scores */}
            <div className="bg-card rounded-xl shadow-custom-md border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Dimension Scores</h3>
              <div className="space-y-4">
                {dimensions.map((dim) => (
                  <div key={dim.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{dim.name}</span>
                      <ScoreBadge score={dim.score} size="sm" />
                    </div>
                    <Progress value={dim.score} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">Weight: {dim.weight}%</p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Rationale */}
            <div className="bg-card rounded-xl shadow-custom-md border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">AI Rationale</h3>
              <p className="text-sm text-foreground leading-relaxed">
                This story demonstrates good clarity and independence, with a clear user perspective. 
                However, the acceptance criteria could be more detailed, particularly around error 
                handling and edge cases. Adding specific security and performance requirements would 
                significantly improve the story's completeness and testability.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Modal */}
      <Dialog open={showComparison} onOpenChange={setShowComparison}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Story Comparison: Original vs AI-Improved</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-6 mt-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                Original Story
                <ScoreBadge score={78} size="sm" />
              </h3>
              <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Summary</p>
                  <p className="text-sm">As a user, I want to login with email and password</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Acceptance Criteria</p>
                  <ul className="text-sm space-y-1">
                    <li>• User can enter email and password</li>
                    <li>• System validates credentials</li>
                    <li>• Error message shown for invalid credentials</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                AI-Improved Story
                <ScoreBadge score={92} size="sm" />
              </h3>
              <div className="bg-primary/5 rounded-lg p-4 space-y-3 border border-primary/20">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Summary</p>
                  <p className="text-sm">As a user, I want to securely login with my email and password so that I can access my personalized dashboard</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Acceptance Criteria</p>
                  <ul className="text-sm space-y-1">
                    <li>• User can enter valid email format and password (min 8 characters)</li>
                    <li>• System validates credentials against secure database</li>
                    <li>• Specific error messages for: invalid email, wrong password, account locked</li>
                    <li>• Login completes within 2 seconds under normal load</li>
                    <li>• Password is masked during entry</li>
                    <li>• Screen reader announces form fields and errors</li>
                    <li>• Failed attempts are logged for security monitoring</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setShowComparison(false)}>
              Cancel
            </Button>
            <Button className="gradient-primary text-white">
              Apply to Jira
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default StoryDetail;
