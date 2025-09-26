import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, RotateCcw, Home, Clock, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface InteractiveQuizProps {
  quiz: {
    id: string;
    title: string;
    subject: string;
    difficulty: string;
    duration: number;
    questions: Question[];
  };
  onBack: () => void;
}

export function InteractiveQuiz({ quiz, onBack }: InteractiveQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(quiz.questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quiz.duration * 60);
  const [quizComplete, setQuizComplete] = useState(false);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (timeLeft > 0 && !quizComplete) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleQuizComplete();
    }
  }, [timeLeft, quizComplete]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(answers[currentQuestion + 1]);
      setShowResult(false);
    } else {
      handleQuizComplete();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedAnswer(answers[currentQuestion - 1]);
      setShowResult(false);
    }
  };

  const handleShowResult = () => {
    setShowResult(true);
  };

  const handleQuizComplete = () => {
    const correctAnswers = answers.reduce((count, answer, index) => {
      return answer === quiz.questions[index].correctAnswer ? count + 1 : count;
    }, 0);
    
    const finalScore = Math.round((correctAnswers / quiz.questions.length) * 100);
    setScore(finalScore);
    setQuizComplete(true);
    
    toast({
      title: "Quiz Complete!",
      description: `You scored ${finalScore}% (${correctAnswers}/${quiz.questions.length})`,
    });
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers(new Array(quiz.questions.length).fill(null));
    setShowResult(false);
    setTimeLeft(quiz.duration * 60);
    setQuizComplete(false);
    setScore(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    const percentage = (timeLeft / (quiz.duration * 60)) * 100;
    if (percentage > 50) return "text-success";
    if (percentage > 25) return "text-warning";
    return "text-destructive";
  };

  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;
  const currentQ = quiz.questions[currentQuestion];

  if (quizComplete) {
    return (
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center space-y-4">
          <Trophy className={`w-24 h-24 mx-auto ${score >= 80 ? 'text-warning' : score >= 60 ? 'text-success' : 'text-muted-foreground'}`} />
          <h1 className="text-3xl font-bold">Quiz Complete!</h1>
          <div className="space-y-2">
            <p className="text-xl">Your Score: <span className="font-bold text-primary">{score}%</span></p>
            <p>Correct Answers: {answers.filter((answer, index) => answer === quiz.questions[index].correctAnswer).length}/{quiz.questions.length}</p>
            <p>Time Taken: {formatTime(quiz.duration * 60 - timeLeft)}</p>
          </div>
          
          <Badge variant={score >= 80 ? "default" : score >= 60 ? "secondary" : "destructive"} className="text-lg px-4 py-2">
            {score >= 80 ? "Excellent!" : score >= 60 ? "Good Job!" : "Keep Practicing!"}
          </Badge>
        </div>

        <div className="flex justify-center gap-4">
          <Button onClick={resetQuiz}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Retake Quiz
          </Button>
          <Button variant="outline" onClick={onBack}>
            <Home className="w-4 h-4 mr-2" />
            Back to Quizzes
          </Button>
        </div>

        {/* Review Answers */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Review Your Answers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {quiz.questions.map((question, index) => {
              const userAnswer = answers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div key={question.id} className="space-y-3 p-4 border rounded-lg">
                  <div className="flex items-start gap-2">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-success mt-1" />
                    ) : (
                      <XCircle className="w-5 h-5 text-destructive mt-1" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{index + 1}. {question.question}</p>
                      <div className="mt-2 space-y-1">
                        {question.options.map((option, optionIndex) => (
                          <div 
                            key={optionIndex}
                            className={`p-2 rounded text-sm ${
                              optionIndex === question.correctAnswer 
                                ? 'bg-success/20 border border-success' 
                                : optionIndex === userAnswer && !isCorrect
                                  ? 'bg-destructive/20 border border-destructive'
                                  : 'bg-muted'
                            }`}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">{question.explanation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <Home className="w-4 h-4 mr-2" />
          Back to Quizzes
        </Button>
        <div className="text-center">
          <h1 className="text-xl font-bold">{quiz.title}</h1>
          <Badge variant="secondary">{quiz.subject} • {quiz.difficulty}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span className={`font-bold ${getTimeColor()}`}>{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-lg">{currentQ.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            {currentQ.options.map((option, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant={selectedAnswer === index ? "default" : "outline"}
                  className={`w-full text-left justify-start h-auto p-4 ${
                    showResult
                      ? index === currentQ.correctAnswer
                        ? 'bg-success/20 border-success hover:bg-success/30'
                        : index === selectedAnswer && selectedAnswer !== currentQ.correctAnswer
                          ? 'bg-destructive/20 border-destructive hover:bg-destructive/30'
                          : ''
                      : ''
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                >
                  <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </Button>
              </motion.div>
            ))}
          </div>

          {showResult && (
            <motion.div 
              className="p-4 bg-muted rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="font-medium mb-2">
                {selectedAnswer === currentQ.correctAnswer ? "Correct!" : "Incorrect!"}
              </p>
              <p className="text-sm text-muted-foreground">{currentQ.explanation}</p>
            </motion.div>
          )}

          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            
            <div className="flex gap-2">
              {!showResult && selectedAnswer !== null && (
                <Button variant="secondary" onClick={handleShowResult}>
                  Show Answer
                </Button>
              )}
              
              <Button 
                onClick={currentQuestion === quiz.questions.length - 1 ? handleQuizComplete : handleNext}
                disabled={selectedAnswer === null}
              >
                {currentQuestion === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Question Navigator */}
      <Card className="max-w-4xl mx-auto">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {quiz.questions.map((_, index) => (
              <Button
                key={index}
                variant={index === currentQuestion ? "default" : answers[index] !== null ? "secondary" : "outline"}
                size="sm"
                className="w-10 h-10 p-0"
                onClick={() => {
                  setCurrentQuestion(index);
                  setSelectedAnswer(answers[index]);
                  setShowResult(false);
                }}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}