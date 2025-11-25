import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Download, Calendar } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const sprintComparison = [
  { sprint: "Sprint 1", avgScore: 62, stories: 28 },
  { sprint: "Sprint 2", avgScore: 68, stories: 32 },
  { sprint: "Sprint 3", avgScore: 71, stories: 30 },
  { sprint: "Sprint 4", avgScore: 75, stories: 35 },
  { sprint: "Sprint 5", avgScore: 78, stories: 38 },
  { sprint: "Sprint 6", avgScore: 82, stories: 34 },
];

const issueBreakdown = [
  { name: "Missing ACs", value: 35, color: "hsl(var(--destructive))" },
  { name: "Unclear Description", value: 28, color: "hsl(var(--warning))" },
  { name: "Poor Testability", value: 22, color: "hsl(var(--accent))" },
  { name: "Dependencies", value: 15, color: "hsl(var(--primary))" },
];

const Analytics = () => {
  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Analytics</h1>
            <p className="text-muted-foreground">Deep insights into story quality trends</p>
          </div>
          <div className="flex gap-3">
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

        {/* Charts */}
        <div className="space-y-6">
          {/* Sprint Comparison */}
          <div className="bg-card rounded-xl shadow-custom-md border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Sprint-over-Sprint Quality Improvement</h3>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={sprintComparison}>
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Issue Breakdown */}
            <div className="bg-card rounded-xl shadow-custom-md border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">Common Quality Issues</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={issueBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="hsl(var(--primary))"
                    dataKey="value"
                  >
                    {issueBreakdown.map((entry, index) => (
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
            <div className="bg-card rounded-xl shadow-custom-md border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">Stories by Quality Band</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[
                    { band: "Excellent (80+)", count: 45 },
                    { band: "Good (60-79)", count: 52 },
                    { band: "Fair (40-59)", count: 23 },
                    { band: "Poor (<40)", count: 7 },
                  ]}
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
