import { motion } from "framer-motion";
import { BookOpen, Trophy, Clock, TrendingUp, Play, FileText, Gamepad2, BarChart3 } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div 
        className="hero-section rounded-2xl p-8 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative z-10">
          <motion.h1 
            className="text-4xl font-bold mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Welcome back, Alex! 🎓
          </motion.h1>
          <motion.p 
            className="text-lg opacity-90 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Ready to continue your learning journey? You're doing great!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button size="lg" variant="secondary" className="font-semibold">
              <Play className="w-5 h-5 mr-2" />
              Continue Learning
            </Button>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 animate-float"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16 animate-pulse-soft"></div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Courses Completed"
          value="12"
          change="+2 this week"
          icon={BookOpen}
          color="primary"
        />
        <StatsCard
          title="Quiz Score Average"
          value="85%"
          change="+12%"
          icon={Trophy}
          color="accent"
          trend="up"
        />
        <StatsCard
          title="Study Time Today"
          value="2h 15m"
          change="+45m"
          icon={Clock}
          color="success"
        />
        <StatsCard
          title="Learning Streak"
          value="7 days"
          change="+1 day"
          icon={TrendingUp}
          color="warning"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card className="learning-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Recent Activity
              </CardTitle>
              <CardDescription>Your learning progress this week</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Mathematics Quiz</p>
                      <p className="text-sm text-muted-foreground">Completed with 92% score</p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">2 hours ago</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Gamepad2 className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium">Science Memory Game</p>
                      <p className="text-sm text-muted-foreground">New high score achieved!</p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">5 hours ago</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-warning" />
                    </div>
                    <div>
                      <p className="font-medium">Physics Notes</p>
                      <p className="text-sm text-muted-foreground">Downloaded for offline study</p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">1 day ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Sidebar */}
        <div className="space-y-6">
          {/* Current Course Progress */}
          <Card className="learning-card">
            <CardHeader>
              <CardTitle className="text-lg">Current Course</CardTitle>
              <CardDescription>Advanced Mathematics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>75%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <Button className="w-full" variant="outline">
                  Continue Course
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="learning-card">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="ghost">
                <BookOpen className="w-4 h-4 mr-2" />
                Take a Quiz
              </Button>
              <Button className="w-full justify-start" variant="ghost">
                <Gamepad2 className="w-4 h-4 mr-2" />
                Play Games
              </Button>
              <Button className="w-full justify-start" variant="ghost">
                <FileText className="w-4 h-4 mr-2" />
                Download Notes
              </Button>
              <Button className="w-full justify-start" variant="ghost">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}