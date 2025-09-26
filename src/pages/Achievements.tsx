import { motion } from "framer-motion";
import { Trophy, Medal, Star, Award, Crown, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const achievements = [
  {
    id: 1,
    title: "First Steps",
    description: "Complete your first quiz",
    icon: Target,
    unlocked: true,
    unlockedAt: "2024-01-15",
    category: "Getting Started",
    points: 50
  },
  {
    id: 2,
    title: "Quiz Master",
    description: "Score 90% or higher on 5 quizzes",
    icon: Trophy,
    unlocked: true,
    unlockedAt: "2024-01-22",
    category: "Academic",
    points: 150
  },
  {
    id: 3,
    title: "Game Champion",
    description: "Win 10 educational games",
    icon: Crown,
    unlocked: true,
    unlockedAt: "2024-02-01",
    category: "Gaming",
    points: 200
  },
  {
    id: 4,
    title: "Streak Master",
    description: "Maintain a 7-day learning streak",
    icon: Medal,
    unlocked: false,
    category: "Consistency",
    points: 100,
    progress: 5,
    target: 7
  },
  {
    id: 5,
    title: "Perfect Score",
    description: "Get 100% on any quiz",
    icon: Star,
    unlocked: false,
    category: "Academic",
    points: 300,
    progress: 98,
    target: 100
  },
  {
    id: 6,
    title: "Scholar",
    description: "Complete 25 quizzes",
    icon: Award,
    unlocked: false,
    category: "Academic",
    points: 500,
    progress: 12,
    target: 25
  }
];

const categories = ["All", "Getting Started", "Academic", "Gaming", "Consistency"];

export default function Achievements() {
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalPoints = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold">🏆 Achievements</h1>
        <p className="text-lg text-muted-foreground">
          Track your learning milestones and celebrate your progress!
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary">{unlockedCount}</div>
              <p className="text-sm text-muted-foreground">Achievements Unlocked</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-accent">{totalPoints}</div>
              <p className="text-sm text-muted-foreground">Achievement Points</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-warning">{Math.round((unlockedCount / achievements.length) * 100)}%</div>
              <p className="text-sm text-muted-foreground">Completion Rate</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Achievement Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
              achievement.unlocked 
                ? 'border-primary/50 bg-gradient-to-br from-primary/5 to-transparent' 
                : 'border-muted'
            }`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl ${
                    achievement.unlocked 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <achievement.icon className="w-6 h-6" />
                  </div>
                  <Badge variant={achievement.unlocked ? "default" : "secondary"}>
                    {achievement.points} pts
                  </Badge>
                </div>
                <div>
                  <CardTitle className={`text-lg ${!achievement.unlocked && 'text-muted-foreground'}`}>
                    {achievement.title}
                  </CardTitle>
                  <CardDescription>{achievement.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Badge variant="outline" className="mb-2">
                    {achievement.category}
                  </Badge>
                  
                  {achievement.unlocked ? (
                    <div className="flex items-center gap-2 text-sm text-success">
                      <Trophy className="w-4 h-4" />
                      Unlocked {new Date(achievement.unlockedAt!).toLocaleDateString()}
                    </div>
                  ) : achievement.progress !== undefined ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{achievement.progress}/{achievement.target}</span>
                      </div>
                      <Progress 
                        value={(achievement.progress / achievement.target!) * 100} 
                        className="h-2"
                      />
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      Keep learning to unlock!
                    </div>
                  )}
                </div>
              </CardContent>
              
              {achievement.unlocked && (
                <div className="absolute top-2 right-2">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                    <Trophy className="w-3 h-3" />
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}