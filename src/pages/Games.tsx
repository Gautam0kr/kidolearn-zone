import { motion } from "framer-motion";
import { Gamepad2, Trophy, Timer, Star, Play, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const games = [
  {
    id: 1,
    title: "Math Memory Match",
    category: "Mathematics",
    description: "Match mathematical equations with their correct answers",
    difficulty: "Easy",
    players: "Single Player",
    bestScore: 1250,
    lastPlayed: "2 days ago",
    image: "🧮"
  },
  {
    id: 2,
    title: "Science Lab Simulator",
    category: "Science", 
    description: "Conduct virtual experiments and learn chemistry",
    difficulty: "Medium",
    players: "Single Player",
    bestScore: 890,
    lastPlayed: "5 days ago",
    image: "🧪"
  },
  {
    id: 3,
    title: "Word Builder Challenge",
    category: "English",
    description: "Build words from given letters and expand vocabulary",
    difficulty: "Hard",
    players: "Multiplayer",
    bestScore: null,
    lastPlayed: null,
    image: "📚"
  },
  {
    id: 4,
    title: "Geography Quiz Rush",
    category: "Geography",
    description: "Quick-fire geography questions with time pressure",
    difficulty: "Medium",
    players: "Single Player",
    bestScore: 2100,
    lastPlayed: "1 week ago",
    image: "🌍"
  },
  {
    id: 5,
    title: "Physics Puzzle Lab",
    category: "Physics", 
    description: "Solve physics puzzles using real-world principles",
    difficulty: "Hard",
    players: "Single Player",
    bestScore: 756,
    lastPlayed: "3 days ago",
    image: "⚛️"
  },
  {
    id: 6,
    title: "History Timeline",
    category: "History",
    description: "Arrange historical events in correct chronological order",
    difficulty: "Easy",
    players: "Single Player",
    bestScore: 1850,
    lastPlayed: "1 day ago",
    image: "📜"
  }
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy": return "bg-success text-success-foreground";
    case "Medium": return "bg-warning text-warning-foreground"; 
    case "Hard": return "bg-destructive text-destructive-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

export default function Games() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Educational Games</h1>
        <p className="text-muted-foreground">Learn while having fun with interactive games</p>
      </motion.div>

      {/* Gaming Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          className="learning-card text-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <Gamepad2 className="w-6 h-6 text-primary-foreground" />
          </div>
          <h3 className="text-2xl font-bold">18</h3>
          <p className="text-sm text-muted-foreground">Games Played</p>
        </motion.div>

        <motion.div
          className="learning-card text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-6 h-6 text-accent-foreground" />
          </div>
          <h3 className="text-2xl font-bold">2,100</h3>
          <p className="text-sm text-muted-foreground">High Score</p>
        </motion.div>

        <motion.div
          className="learning-card text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="w-12 h-12 bg-warning rounded-xl flex items-center justify-center mx-auto mb-4">
            <Timer className="w-6 h-6 text-warning-foreground" />
          </div>
          <h3 className="text-2xl font-bold">45m</h3>
          <p className="text-sm text-muted-foreground">Time Played</p>
        </motion.div>

        <motion.div
          className="learning-card text-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="w-12 h-12 bg-success rounded-xl flex items-center justify-center mx-auto mb-4">
            <Star className="w-6 h-6 text-success-foreground" />
          </div>
          <h3 className="text-2xl font-bold">12</h3>
          <p className="text-sm text-muted-foreground">Achievements</p>
        </motion.div>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="learning-card group hover:shadow-large transition-all duration-300 cursor-pointer">
              <CardHeader className="text-center">
                <div className="text-6xl mb-4 animate-float">{game.image}</div>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-lg">{game.title}</CardTitle>
                  <Badge className={getDifficultyColor(game.difficulty)}>
                    {game.difficulty}
                  </Badge>
                </div>
                <CardDescription>{game.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{game.players}</span>
                  </div>
                  <Badge variant="secondary">{game.category}</Badge>
                </div>

                {game.bestScore && (
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-success" />
                    <span className="text-sm font-medium">Best Score: {game.bestScore.toLocaleString()}</span>
                  </div>
                )}

                {game.lastPlayed && (
                  <p className="text-xs text-muted-foreground">Last played: {game.lastPlayed}</p>
                )}

                <Button className="w-full group-hover:shadow-medium transition-all duration-300">
                  <Play className="w-4 h-4 mr-2" />
                  Play Game
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Coming Soon */}
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="text-6xl mb-4 animate-pulse-soft">🎮</div>
        <h3 className="text-xl font-bold mb-2">More Games Coming Soon!</h3>
        <p className="text-muted-foreground">
          We're working on adding more educational games to make learning even more fun.
        </p>
      </motion.div>

      {/* Note about backend */}
      <motion.div
        className="mt-12 p-6 bg-primary/5 border border-primary/20 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <h3 className="text-lg font-semibold text-primary mb-2">Ready for Interactive Games?</h3>
        <p className="text-muted-foreground mb-4">
          To save game scores, enable multiplayer features, and create interactive gameplay, 
          connect your app to Supabase for real-time data storage and user management.
        </p>
        <Button variant="outline">
          <Gamepad2 className="w-4 h-4 mr-2" />
          Learn About Game Development
        </Button>
      </motion.div>
    </div>
  );
}