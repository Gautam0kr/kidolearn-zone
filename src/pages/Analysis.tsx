import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Clock, Target, Calendar, Trophy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

// Sample data for charts
const weeklyProgress = [
  { day: "Mon", quizzes: 3, games: 2, study: 45 },
  { day: "Tue", quizzes: 5, games: 4, study: 60 },
  { day: "Wed", quizzes: 2, games: 1, study: 30 },
  { day: "Thu", quizzes: 4, games: 3, study: 75 },
  { day: "Fri", quizzes: 6, games: 5, study: 90 },
  { day: "Sat", quizzes: 3, games: 2, study: 40 },
  { day: "Sun", quizzes: 4, games: 3, study: 55 }
];

const subjectPerformance = [
  { subject: "Math", score: 92, total: 100 },
  { subject: "Physics", score: 88, total: 100 },
  { subject: "Chemistry", score: 85, total: 100 },
  { subject: "English", score: 94, total: 100 },
  { subject: "Biology", score: 89, total: 100 },
  { subject: "History", score: 91, total: 100 }
];

const learningTime = [
  { name: "Quizzes", value: 35, color: "#3b82f6" },
  { name: "Games", value: 25, color: "#10b981" },
  { name: "Reading", value: 30, color: "#f59e0b" },
  { name: "Videos", value: 10, color: "#ef4444" }
];

const monthlyTrend = [
  { month: "Jan", score: 75, time: 20 },
  { month: "Feb", score: 82, time: 35 },
  { month: "Mar", score: 78, time: 28 },
  { month: "Apr", score: 86, time: 42 },
  { month: "May", score: 90, time: 48 },
  { month: "Jun", score: 92, time: 55 }
];

const chartConfig = {
  quizzes: { label: "Quizzes", color: "hsl(var(--primary))" },
  games: { label: "Games", color: "hsl(var(--accent))" },
  study: { label: "Study Time", color: "hsl(var(--success))" }
};

export default function Analysis() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Learning Analytics</h1>
        <p className="text-muted-foreground">Track your progress and identify improvement areas</p>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          className="learning-card text-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <Target className="w-6 h-6 text-primary-foreground" />
          </div>
          <h3 className="text-2xl font-bold">89%</h3>
          <p className="text-sm text-muted-foreground">Overall Performance</p>
          <Badge variant="secondary" className="mt-2">+5% this month</Badge>
        </motion.div>

        <motion.div
          className="learning-card text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center mx-auto mb-4">
            <Clock className="w-6 h-6 text-accent-foreground" />
          </div>
          <h3 className="text-2xl font-bold">42h</h3>
          <p className="text-sm text-muted-foreground">Total Study Time</p>
          <Badge variant="secondary" className="mt-2">+8h this week</Badge>
        </motion.div>

        <motion.div
          className="learning-card text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="w-12 h-12 bg-success rounded-xl flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-6 h-6 text-success-foreground" />
          </div>
          <h3 className="text-2xl font-bold">15</h3>
          <p className="text-sm text-muted-foreground">Learning Streak</p>
          <Badge variant="secondary" className="mt-2">Personal Best!</Badge>
        </motion.div>

        <motion.div
          className="learning-card text-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="w-12 h-12 bg-warning rounded-xl flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-6 h-6 text-warning-foreground" />
          </div>
          <h3 className="text-2xl font-bold">23</h3>
          <p className="text-sm text-muted-foreground">Achievements</p>
          <Badge variant="secondary" className="mt-2">+3 this week</Badge>
        </motion.div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="learning-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Weekly Activity
              </CardTitle>
              <CardDescription>Your learning activities this week</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyProgress}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="quizzes" fill="hsl(var(--primary))" radius={4} />
                    <Bar dataKey="games" fill="hsl(var(--accent))" radius={4} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Subject Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="learning-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-success" />
                Subject Performance
              </CardTitle>
              <CardDescription>Your average scores by subject</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjectPerformance.map((subject, index) => (
                  <div key={subject.subject} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{subject.subject}</span>
                      <span className="text-sm font-bold">{subject.score}%</span>
                    </div>
                    <div className="progress-bar">
                      <motion.div 
                        className="progress-fill" 
                        initial={{ width: 0 }}
                        animate={{ width: `${subject.score}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Monthly Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card className="learning-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                Monthly Trend
              </CardTitle>
              <CardDescription>Your progress over the past 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Learning Time Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card className="learning-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-warning" />
                Time Distribution
              </CardTitle>
              <CardDescription>How you spend your learning time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={learningTime}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {learningTime.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-background border rounded-lg p-2 shadow-lg">
                              <p className="font-medium">{payload[0].payload.name}</p>
                              <p className="text-sm text-muted-foreground">{payload[0].value}%</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {learningTime.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">{item.name}: {item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Insights Section */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <h2 className="text-2xl font-bold">📊 Learning Insights</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="learning-card border-success/20">
            <CardHeader>
              <CardTitle className="text-success">🎯 Strengths</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Consistent daily study habits</li>
                <li>• Strong performance in English (94%)</li>
                <li>• Excellent quiz completion rate</li>
                <li>• Growing learning streak</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="learning-card border-warning/20">
            <CardHeader>
              <CardTitle className="text-warning">🎯 Areas for Improvement</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Increase Chemistry practice time</li>
                <li>• More interactive game sessions</li>
                <li>• Review video lecture materials</li>
                <li>• Focus on Physics problem-solving</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Note about backend */}
      <motion.div
        className="mt-12 p-6 bg-primary/5 border border-primary/20 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
      >
        <h3 className="text-lg font-semibold text-primary mb-2">Ready for Real Analytics?</h3>
        <p className="text-muted-foreground mb-4">
          To track real user progress, generate personalized insights, and store historical data, 
          connect your app to Supabase for comprehensive analytics and reporting capabilities.
        </p>
        <Button variant="outline">
          <BarChart3 className="w-4 h-4 mr-2" />
          Learn About Analytics Setup
        </Button>
      </motion.div>
    </div>
  );
}