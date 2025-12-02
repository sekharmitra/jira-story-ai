import { Layout } from "@/components/Layout";
import { KPICard } from "@/components/KPICard";
import { ScoreBadge } from "@/components/ScoreBadge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Award, AlertTriangle, TrendingUp, Calendar, Filter } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { useState } from "react";

const projects = [
  { key: "ECOM", name: "E-Commerce Platform" },
  { key: "MOBILE", name: "Mobile App" },
  { key: "DASH", name: "Analytics Dashboard" },
  { key: "PORTAL", name: "Customer Portal" },
];

const projectData: Record<string, {
  kpis: { avgScore: number; missingACs: number; riskyStories: number; ratedToday: number };
  qualityDistribution: Array<{ range: string; count: number }>;
  trendData: Array<{ sprint: string; score: number }>;
  weakStories: Array<{ key: string; summary: string; score: number; status: string }>;
}> = {
  "ECOM": {
    kpis: { avgScore: 78, missingACs: 23, riskyStories: 12, ratedToday: 34 },
    qualityDistribution: [
      { range: "0-20", count: 3 },
      { range: "21-40", count: 8 },
      { range: "41-60", count: 15 },
      { range: "61-80", count: 24 },
      { range: "81-100", count: 18 },
    ],
    trendData: [
      { sprint: "Sprint 1", score: 62 },
      { sprint: "Sprint 2", score: 68 },
      { sprint: "Sprint 3", score: 71 },
      { sprint: "Sprint 4", score: 75 },
      { sprint: "Sprint 5", score: 78 },
      { sprint: "Sprint 6", score: 82 },
    ],
    weakStories: [
      { key: "ECOM-123", summary: "User can view dashboard", score: 42, status: "In Progress" },
      { key: "ECOM-124", summary: "Implement search feature", score: 38, status: "To Do" },
      { key: "ECOM-125", summary: "Add user profile", score: 45, status: "In Progress" },
      { key: "ECOM-126", summary: "Fix login bug", score: 35, status: "To Do" },
    ],
  },
  "MOBILE": {
    kpis: { avgScore: 82, missingACs: 15, riskyStories: 8, ratedToday: 22 },
    qualityDistribution: [
      { range: "0-20", count: 1 },
      { range: "21-40", count: 5 },
      { range: "41-60", count: 12 },
      { range: "61-80", count: 28 },
      { range: "81-100", count: 24 },
    ],
    trendData: [
      { sprint: "Sprint 1", score: 65 },
      { sprint: "Sprint 2", score: 72 },
      { sprint: "Sprint 3", score: 76 },
      { sprint: "Sprint 4", score: 79 },
      { sprint: "Sprint 5", score: 81 },
      { sprint: "Sprint 6", score: 85 },
    ],
    weakStories: [
      { key: "MOBILE-201", summary: "Add push notifications", score: 48, status: "In Progress" },
      { key: "MOBILE-202", summary: "Optimize app performance", score: 52, status: "To Do" },
    ],
  },
  "DASH": {
    kpis: { avgScore: 75, missingACs: 18, riskyStories: 10, ratedToday: 15 },
    qualityDistribution: [
      { range: "0-20", count: 2 },
      { range: "21-40", count: 6 },
      { range: "41-60", count: 18 },
      { range: "61-80", count: 20 },
      { range: "81-100", count: 14 },
    ],
    trendData: [
      { sprint: "Sprint 1", score: 60 },
      { sprint: "Sprint 2", score: 65 },
      { sprint: "Sprint 3", score: 70 },
      { sprint: "Sprint 4", score: 73 },
      { sprint: "Sprint 5", score: 75 },
      { sprint: "Sprint 6", score: 78 },
    ],
    weakStories: [
      { key: "DASH-301", summary: "Create custom widgets", score: 41, status: "To Do" },
      { key: "DASH-302", summary: "Export functionality", score: 46, status: "In Progress" },
      { key: "DASH-303", summary: "Real-time updates", score: 39, status: "To Do" },
    ],
  },
  "PORTAL": {
    kpis: { avgScore: 71, missingACs: 28, riskyStories: 15, ratedToday: 18 },
    qualityDistribution: [
      { range: "0-20", count: 4 },
      { range: "21-40", count: 10 },
      { range: "41-60", count: 16 },
      { range: "61-80", count: 18 },
      { range: "81-100", count: 12 },
    ],
    trendData: [
      { sprint: "Sprint 1", score: 58 },
      { sprint: "Sprint 2", score: 62 },
      { sprint: "Sprint 3", score: 67 },
      { sprint: "Sprint 4", score: 70 },
      { sprint: "Sprint 5", score: 72 },
      { sprint: "Sprint 6", score: 74 },
    ],
    weakStories: [
      { key: "PORTAL-401", summary: "Customer feedback form", score: 37, status: "To Do" },
      { key: "PORTAL-402", summary: "Support ticket system", score: 44, status: "In Progress" },
      { key: "PORTAL-403", summary: "Knowledge base search", score: 40, status: "To Do" },
      { key: "PORTAL-404", summary: "Live chat integration", score: 36, status: "To Do" },
    ],
  },
};

const Dashboard = () => {
  const [selectedProject, setSelectedProject] = useState<string>("ECOM");
  const currentData = projectData[selectedProject];

  return (
    <Layout>
      <div className="p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Dashboard</h1>
              <p className="text-sm md:text-base text-muted-foreground">Monitor your user story quality and trends</p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="w-full sm:w-64">
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
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
              <Button className="gradient-primary text-white gap-2 shadow-custom-md">
                <TrendingUp className="w-4 h-4" />
                Evaluate Stories
              </Button>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          <KPICard
            title="Avg Quality Score"
            value={currentData.kpis.avgScore.toString()}
            icon={Award}
            trend={{ value: 5.2, isPositive: true }}
          />
          <KPICard
            title="Missing ACs"
            value={`${currentData.kpis.missingACs}%`}
            icon={AlertTriangle}
            trend={{ value: 3.1, isPositive: false }}
          />
          <KPICard
            title="Risky Stories"
            value={currentData.kpis.riskyStories.toString()}
            icon={AlertTriangle}
            trend={{ value: 2.5, isPositive: false }}
          />
          <KPICard
            title="Rated Today"
            value={currentData.kpis.ratedToday.toString()}
            icon={Calendar}
            trend={{ value: 12.0, isPositive: true }}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Quality Distribution */}
          <div className="bg-card rounded-xl p-4 md:p-6 shadow-custom-md border border-border">
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">Story Quality Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={currentData.qualityDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="range" stroke="hsl(var(--muted-foreground))" className="text-xs" />
                <YAxis stroke="hsl(var(--muted-foreground))" className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Quality Trend */}
          <div className="bg-card rounded-xl p-4 md:p-6 shadow-custom-md border border-border">
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">Quality Trend by Sprint</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={currentData.trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="sprint" stroke="hsl(var(--muted-foreground))" className="text-xs" />
                <YAxis stroke="hsl(var(--muted-foreground))" className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="hsl(var(--accent))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--accent))", r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weakest Stories */}
        <div className="bg-card rounded-xl shadow-custom-md border border-border overflow-hidden">
          <div className="p-4 md:p-6 border-b border-border">
            <h3 className="text-base md:text-lg font-semibold text-foreground">Stories Needing Attention</h3>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">Stories with the lowest quality scores</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-foreground">Story Key</th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-foreground">Summary</th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-foreground">Score</th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-foreground">Status</th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-right text-xs md:text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {currentData.weakStories.map((story) => (
                  <tr key={story.key} className="hover:bg-muted/30 transition-smooth">
                    <td className="px-4 md:px-6 py-3 md:py-4">
                      <span className="font-mono text-xs md:text-sm font-medium text-primary">{story.key}</span>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm text-foreground">{story.summary}</td>
                    <td className="px-4 md:px-6 py-3 md:py-4">
                      <ScoreBadge score={story.score} size="sm" />
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4">
                      <span className="px-2 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground">
                        {story.status}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4 text-right">
                      <Button variant="outline" size="sm" className="text-xs">
                        View Rating
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
