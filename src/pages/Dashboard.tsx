import { Layout } from "@/components/Layout";
import { KPICard } from "@/components/KPICard";
import { ScoreBadge } from "@/components/ScoreBadge";
import { Button } from "@/components/ui/button";
import { Award, AlertTriangle, TrendingUp, Calendar, Filter } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const qualityDistribution = [
  { range: "0-20", count: 3 },
  { range: "21-40", count: 8 },
  { range: "41-60", count: 15 },
  { range: "61-80", count: 24 },
  { range: "81-100", count: 18 },
];

const trendData = [
  { sprint: "Sprint 1", score: 62 },
  { sprint: "Sprint 2", score: 68 },
  { sprint: "Sprint 3", score: 71 },
  { sprint: "Sprint 4", score: 75 },
  { sprint: "Sprint 5", score: 78 },
  { sprint: "Sprint 6", score: 82 },
];

const weakStories = [
  { key: "ABC-123", summary: "User can view dashboard", score: 42, status: "In Progress" },
  { key: "ABC-124", summary: "Implement search feature", score: 38, status: "To Do" },
  { key: "ABC-125", summary: "Add user profile", score: 45, status: "In Progress" },
  { key: "ABC-126", summary: "Fix login bug", score: 35, status: "To Do" },
];

const Dashboard = () => {
  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Monitor your user story quality and trends</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button className="gradient-primary text-white gap-2 shadow-custom-md">
              <TrendingUp className="w-4 h-4" />
              Rate Stories
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Avg Quality Score"
            value="78"
            icon={Award}
            trend={{ value: 5.2, isPositive: true }}
          />
          <KPICard
            title="Missing ACs"
            value="23%"
            icon={AlertTriangle}
            trend={{ value: 3.1, isPositive: false }}
          />
          <KPICard
            title="Risky Stories"
            value="12"
            icon={AlertTriangle}
            trend={{ value: 2.5, isPositive: false }}
          />
          <KPICard
            title="Rated Today"
            value="34"
            icon={Calendar}
            trend={{ value: 12.0, isPositive: true }}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Quality Distribution */}
          <div className="bg-card rounded-xl p-6 shadow-custom-md border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Story Quality Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={qualityDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="range" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
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
          <div className="bg-card rounded-xl p-6 shadow-custom-md border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quality Trend by Sprint</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="sprint" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
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
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Stories Needing Attention</h3>
            <p className="text-sm text-muted-foreground mt-1">Stories with the lowest quality scores</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Story Key</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Summary</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Score</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {weakStories.map((story) => (
                  <tr key={story.key} className="hover:bg-muted/30 transition-smooth">
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm font-medium text-primary">{story.key}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{story.summary}</td>
                    <td className="px-6 py-4">
                      <ScoreBadge score={story.score} size="sm" />
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground">
                        {story.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="outline" size="sm">
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
