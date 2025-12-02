import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Calendar } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useState } from "react";

const projects = [
  { key: "ECOM", name: "E-Commerce Platform" },
  { key: "MOBILE", name: "Mobile App" },
  { key: "DASH", name: "Analytics Dashboard" },
  { key: "PORTAL", name: "Customer Portal" },
];

const analyticsData: Record<string, {
  sprintComparison: Array<{ sprint: string; avgScore: number; stories: number }>;
  issueBreakdown: Array<{ name: string; value: number; color: string }>;
  qualityBands: Array<{ band: string; count: number }>;
}> = {
  "ECOM": {
    sprintComparison: [
      { sprint: "Sprint 1", avgScore: 62, stories: 28 },
      { sprint: "Sprint 2", avgScore: 68, stories: 32 },
      { sprint: "Sprint 3", avgScore: 71, stories: 30 },
      { sprint: "Sprint 4", avgScore: 75, stories: 35 },
      { sprint: "Sprint 5", avgScore: 78, stories: 38 },
      { sprint: "Sprint 6", avgScore: 82, stories: 34 },
    ],
    issueBreakdown: [
      { name: "Missing ACs", value: 35, color: "hsl(var(--destructive))" },
      { name: "Unclear Description", value: 28, color: "hsl(var(--warning))" },
      { name: "Poor Testability", value: 22, color: "hsl(var(--accent))" },
      { name: "Dependencies", value: 15, color: "hsl(var(--primary))" },
    ],
    qualityBands: [
      { band: "Excellent (80+)", count: 45 },
      { band: "Good (60-79)", count: 52 },
      { band: "Fair (40-59)", count: 23 },
      { band: "Poor (<40)", count: 7 },
    ],
  },
  "MOBILE": {
    sprintComparison: [
      { sprint: "Sprint 1", avgScore: 68, stories: 22 },
      { sprint: "Sprint 2", avgScore: 73, stories: 26 },
      { sprint: "Sprint 3", avgScore: 76, stories: 24 },
      { sprint: "Sprint 4", avgScore: 79, stories: 28 },
      { sprint: "Sprint 5", avgScore: 82, stories: 30 },
      { sprint: "Sprint 6", avgScore: 85, stories: 27 },
    ],
    issueBreakdown: [
      { name: "Missing ACs", value: 25, color: "hsl(var(--destructive))" },
      { name: "Unclear Description", value: 20, color: "hsl(var(--warning))" },
      { name: "Poor Testability", value: 30, color: "hsl(var(--accent))" },
      { name: "Dependencies", value: 25, color: "hsl(var(--primary))" },
    ],
    qualityBands: [
      { band: "Excellent (80+)", count: 58 },
      { band: "Good (60-79)", count: 48 },
      { band: "Fair (40-59)", count: 15 },
      { band: "Poor (<40)", count: 4 },
    ],
  },
  "DASH": {
    sprintComparison: [
      { sprint: "Sprint 1", avgScore: 60, stories: 18 },
      { sprint: "Sprint 2", avgScore: 65, stories: 21 },
      { sprint: "Sprint 3", avgScore: 70, stories: 19 },
      { sprint: "Sprint 4", avgScore: 73, stories: 23 },
      { sprint: "Sprint 5", avgScore: 75, stories: 25 },
      { sprint: "Sprint 6", avgScore: 78, stories: 22 },
    ],
    issueBreakdown: [
      { name: "Missing ACs", value: 30, color: "hsl(var(--destructive))" },
      { name: "Unclear Description", value: 25, color: "hsl(var(--warning))" },
      { name: "Poor Testability", value: 25, color: "hsl(var(--accent))" },
      { name: "Dependencies", value: 20, color: "hsl(var(--primary))" },
    ],
    qualityBands: [
      { band: "Excellent (80+)", count: 35 },
      { band: "Good (60-79)", count: 55 },
      { band: "Fair (40-59)", count: 28 },
      { band: "Poor (<40)", count: 10 },
    ],
  },
  "PORTAL": {
    sprintComparison: [
      { sprint: "Sprint 1", avgScore: 58, stories: 20 },
      { sprint: "Sprint 2", avgScore: 62, stories: 24 },
      { sprint: "Sprint 3", avgScore: 67, stories: 22 },
      { sprint: "Sprint 4", avgScore: 70, stories: 26 },
      { sprint: "Sprint 5", avgScore: 72, stories: 28 },
      { sprint: "Sprint 6", avgScore: 74, stories: 25 },
    ],
    issueBreakdown: [
      { name: "Missing ACs", value: 40, color: "hsl(var(--destructive))" },
      { name: "Unclear Description", value: 30, color: "hsl(var(--warning))" },
      { name: "Poor Testability", value: 18, color: "hsl(var(--accent))" },
      { name: "Dependencies", value: 12, color: "hsl(var(--primary))" },
    ],
    qualityBands: [
      { band: "Excellent (80+)", count: 30 },
      { band: "Good (60-79)", count: 45 },
      { band: "Fair (40-59)", count: 35 },
      { band: "Poor (<40)", count: 15 },
    ],
  },
};

const Analytics = () => {
  const [selectedProject, setSelectedProject] = useState<string>("ECOM");
  const currentData = analyticsData[selectedProject];

  return (
    <Layout>
      <div className="p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Analytics</h1>
              <p className="text-sm md:text-base text-muted-foreground">Deep insights into story quality trends</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
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
                <Calendar className="w-4 h-4" />
                Date Range
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="space-y-6">
          {/* Sprint Comparison */}
        <div className="bg-card rounded-xl shadow-custom-md border border-border p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-6">Sprint-over-Sprint Quality Improvement</h3>
            <ResponsiveContainer width="100%" height={300} className="text-xs md:text-sm">
              <LineChart data={currentData.sprintComparison}>
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
                  dataKey="avgScore"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", r: 6 }}
                  name="Avg Score"
                />
                <Line
                  type="monotone"
                  dataKey="stories"
                  stroke="hsl(var(--accent))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--accent))", r: 4 }}
                  name="Stories Rated"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Issue Breakdown */}
            <div className="bg-card rounded-xl shadow-custom-md border border-border p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-6">Common Quality Issues</h3>
              <ResponsiveContainer width="100%" height={250} className="text-xs md:text-sm">
                <PieChart>
                  <Pie
                    data={currentData.issueBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="hsl(var(--primary))"
                    dataKey="value"
                  >
                    {currentData.issueBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Team Performance */}
            <div className="bg-card rounded-xl shadow-custom-md border border-border p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-6">Stories by Quality Band</h3>
              <ResponsiveContainer width="100%" height={250} className="text-xs md:text-sm">
                <BarChart
                  data={currentData.qualityBands}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                  <YAxis dataKey="band" type="category" stroke="hsl(var(--muted-foreground))" width={120} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
