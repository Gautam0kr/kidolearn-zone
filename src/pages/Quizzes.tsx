import { motion } from "framer-motion";
import { BookOpen, Clock, Trophy, Star, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuizzes, useQuizAttempts } from "@/hooks/useQuizzes";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

const quizzes = [
  {
    id: 1,
    title: "Advanced Mathematics",
    subject: "Mathematics",
    questions: 20,
    duration: "30 min",
    difficulty: "Hard",
    score: 92,
    completed: true,
    description: "Test your knowledge of calculus, algebra, and geometry"
  },
  {
    id: 2,
    title: "Physics Fundamentals",
    subject: "Physics", 
    questions: 15,
    duration: "25 min",
    difficulty: "Medium",
    score: null,
    completed: false,
    description: "Mechanics, thermodynamics, and wave properties"
  },
  {
    id: 3,
    title: "Chemistry Basics",
    subject: "Chemistry",
    questions: 18,
    duration: "35 min", 
    difficulty: "Easy",
    score: 88,
    completed: true,
    description: "Atomic structure, chemical bonding, and reactions"
  },
  {
    id: 4,
    title: "English Literature",
    subject: "English",
    questions: 12,
    duration: "20 min",
    difficulty: "Medium",
    score: null,
    completed: false,
    description: "Poetry analysis, prose comprehension, and grammar"
  }
];

export default function Quizzes() {
  const { user } = useAuth();
  const { data: quizzes, isLoading: quizzesLoading } = useQuizzes();
  const { data: attempts } = useQuizAttempts(user?.id);

  // Calculate stats from attempts
  const completedQuizzes = attempts?.length || 0;
  const avgScore = attempts?.length 
    ? Math.round(attempts.reduce((acc, attempt) => acc + (attempt.score / attempt.total_questions * 100), 0) / attempts.length)
    : 0;
  const perfectScores = attempts?.filter(attempt => attempt.score === attempt.total_questions).length || 0;

  // Get attempt for each quiz to show previous scores
  const getQuizAttempt = (quizId: string) => {
    return attempts?.find(attempt => attempt.quiz_id === quizId);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-success text-success-foreground";
      case "Medium": return "bg-warning text-warning-foreground";
      case "Hard": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  if (quizzesLoading) {
    return (
      <div className="space-y-8">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Quizzes</h1>
        <p className="text-muted-foreground">Test your knowledge and track your progress</p>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className="learning-card text-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-6 h-6 text-primary-foreground" />
          </div>
          <h3 className="text-2xl font-bold">{avgScore}%</h3>
          <p className="text-sm text-muted-foreground">Average Score</p>
        </motion.div>

        <motion.div
          className="learning-card text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-6 h-6 text-accent-foreground" />
          </div>
          <h3 className="text-2xl font-bold">{completedQuizzes}</h3>
          <p className="text-sm text-muted-foreground">Quizzes Completed</p>
        </motion.div>

        <motion.div
          className="learning-card text-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="w-12 h-12 bg-success rounded-xl flex items-center justify-center mx-auto mb-4">
            <Star className="w-6 h-6 text-success-foreground" />
          </div>
          <h3 className="text-2xl font-bold">{perfectScores}</h3>
          <p className="text-sm text-muted-foreground">Perfect Scores</p>
        </motion.div>
      </div>

      {/* Quiz List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {quizzes && quizzes.length > 0 ? (
          quizzes.map((quiz, index) => {
            const attempt = getQuizAttempt(quiz.id);
            return (
              <motion.div
                key={quiz.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="learning-card group hover:shadow-large transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-xl">{quiz.title}</CardTitle>
                        <CardDescription>{quiz.description}</CardDescription>
                      </div>
                      <Badge className={getDifficultyColor(quiz.difficulty)}>
                        {quiz.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{quiz.total_questions} questions</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{quiz.duration_minutes} min</span>
                      </div>
                      <Badge variant="secondary">{quiz.subjects.name}</Badge>
                    </div>

                    {attempt && (
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-success" />
                        <span className="text-sm font-medium text-success">
                          Previous Score: {Math.round(attempt.score / attempt.total_questions * 100)}%
                        </span>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button className="flex-1 group-hover:shadow-medium transition-all duration-300">
                        <Play className="w-4 h-4 mr-2" />
                        {attempt ? "Retake Quiz" : "Start Quiz"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      {attempt && (
                        <Button variant="outline">
                          View Results
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })
        ) : (
          <div className="col-span-2 text-center py-12">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Quizzes Available</h3>
            <p className="text-muted-foreground">Check back later for new quizzes!</p>
          </div>
        )}
      </div>

      {/* Note about backend */}
      <motion.div
        className="mt-12 p-6 bg-primary/5 border border-primary/20 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h3 className="text-lg font-semibold text-primary mb-2">Ready to Add Real Quizzes?</h3>
        <p className="text-muted-foreground mb-4">
          To store quiz data, user progress, and enable real-time scoring, you'll need to connect your app to Supabase. 
          Lovable has a native integration that makes this simple!
        </p>
        <Button variant="outline">
          <BookOpen className="w-4 h-4 mr-2" />
          Learn About Supabase Integration
        </Button>
      </motion.div>
    </div>
  );
}