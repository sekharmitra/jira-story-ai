import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Branding */}
      <div className="hidden md:flex md:w-full lg:w-1/2 gradient-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-center items-start p-8 md:p-16 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-custom-xl">
              <BarChart3 className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">AI Story Rating</h1>
              <p className="text-blue-light text-sm">for Jira</p>
            </div>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold mb-6 leading-tight">
            Transform Your User Stories with AI-Powered Insights
          </h2>
          <p className="text-sm md:text-lg text-blue-light opacity-90 max-w-md">
            Automatically analyze, rate, and improve your Jira user stories with enterprise-grade AI technology.
          </p>
          <div className="mt-12 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span className="text-blue-light">Intelligent story quality scoring</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span className="text-blue-light">Actionable improvement suggestions</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span className="text-blue-light">Seamless Jira integration</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8 bg-gradient-light">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="md:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-custom-md">
              <BarChart3 className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">AI Story Rating</h1>
              <p className="text-xs text-muted-foreground">for Jira</p>
            </div>
          </div>
          
          <div className="bg-card rounded-2xl shadow-custom-xl p-6 md:p-8 border border-border">
            <div className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">Welcome back</h2>
              <p className="text-sm md:text-base text-muted-foreground">Sign in to your account to continue</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  className="h-12"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="api-token">Jira API Token</Label>
                <Input
                  id="api-token"
                  type="password"
                  placeholder="Enter your Jira API token"
                  className="h-12"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-border" />
                  <span className="text-sm text-muted-foreground">Remember me</span>
                </label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot token?
                </a>
              </div>

              <Button type="submit" className="w-full h-12 gradient-primary text-white font-semibold shadow-custom-md hover:shadow-custom-lg">
                Sign in with Jira
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <a href="#" className="text-primary hover:underline font-medium">
                  Get started
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
