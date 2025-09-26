import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Trophy, RotateCcw, Home, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WordBuilderChallengeProps {
  onBack: () => void;
}

const wordSets = [
  {
    letters: "EDUCATION",
    words: ["EDUCATE", "AUDIO", "CUTE", "DATE", "DANCE", "DUCT", "ACE", "CUE", "TOE", "DUE"]
  },
  {
    letters: "LEARNING",
    words: ["LEARN", "RANGE", "ANGER", "ANGEL", "GEAR", "RING", "REAL", "LEAN", "NEAR", "LINE"]
  },
  {
    letters: "KNOWLEDGE",
    words: ["KNOW", "EDGE", "GONE", "DOG", "LOG", "NOD", "ELK", "GOD", "OLD", "END"]
  }
];

export function WordBuilderChallenge({ onBack }: WordBuilderChallengeProps) {
  const [currentSet, setCurrentSet] = useState(0);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState("");
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(180); // 3 minutes
  const [gameComplete, setGameComplete] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const { toast } = useToast();

  const letters = wordSets[currentSet].letters;
  const targetWords = wordSets[currentSet].words;

  useEffect(() => {
    if (timer > 0 && !gameComplete && !gameOver) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setGameOver(true);
    }
  }, [timer, gameComplete, gameOver]);

  useEffect(() => {
    if (foundWords.length === targetWords.length) {
      setGameComplete(true);
      const bonus = timer * 10;
      setScore(prev => prev + bonus);
      toast({
        title: "Amazing!",
        description: `All words found! Time bonus: ${bonus} points`,
      });
    }
  }, [foundWords, targetWords, timer]);

  const resetGame = () => {
    setFoundWords([]);
    setCurrentWord("");
    setScore(0);
    setTimer(180);
    setGameComplete(false);
    setGameOver(false);
    setShowHint(false);
  };

  const nextLevel = () => {
    if (currentSet < wordSets.length - 1) {
      setCurrentSet(prev => prev + 1);
      resetGame();
    } else {
      toast({
        title: "Congratulations!",
        description: "You've completed all levels!",
      });
    }
  };

  const handleSubmit = () => {
    const word = currentWord.toUpperCase();
    
    if (word.length < 3) {
      toast({
        title: "Too short!",
        description: "Words must be at least 3 letters long.",
        variant: "destructive"
      });
      return;
    }

    if (foundWords.includes(word)) {
      toast({
        title: "Already found!",
        description: "You've already found this word.",
        variant: "destructive"
      });
      return;
    }

    // Check if word can be made from available letters
    const letterCount: { [key: string]: number } = {};
    letters.split('').forEach(letter => {
      letterCount[letter] = (letterCount[letter] || 0) + 1;
    });

    const wordLetterCount: { [key: string]: number } = {};
    word.split('').forEach(letter => {
      wordLetterCount[letter] = (wordLetterCount[letter] || 0) + 1;
    });

    const canMakeWord = Object.entries(wordLetterCount).every(([letter, count]) => {
      return letterCount[letter] >= count;
    });

    if (!canMakeWord) {
      toast({
        title: "Invalid word!",
        description: "You can't make this word from the available letters.",
        variant: "destructive"
      });
      return;
    }

    if (targetWords.includes(word)) {
      setFoundWords(prev => [...prev, word]);
      setScore(prev => prev + word.length * 10);
      setCurrentWord("");
      toast({
        title: "Great word!",
        description: `+${word.length * 10} points`,
      });
    } else {
      toast({
        title: "Not in word list",
        description: "That's not one of the target words.",
        variant: "destructive"
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timer > 60) return "text-success";
    if (timer > 30) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <Home className="w-4 h-4 mr-2" />
          Back to Games
        </Button>
        <h1 className="text-2xl font-bold">Word Builder Challenge</h1>
        <Button variant="outline" onClick={resetGame}>
          <RotateCcw className="w-4 h-4 mr-2" />
          New Game
        </Button>
      </div>

      {/* Game Stats */}
      <div className="flex justify-center gap-6">
        <Badge variant="secondary" className="text-lg px-4 py-2">
          Level: {currentSet + 1}
        </Badge>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          Score: {score}
        </Badge>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          Found: {foundWords.length}/{targetWords.length}
        </Badge>
        <Badge variant={timer > 30 ? "secondary" : "destructive"} className={`text-lg px-4 py-2 ${getTimeColor()}`}>
          Time: {formatTime(timer)}
        </Badge>
      </div>

      {/* Game Complete/Over Modal */}
      {(gameComplete || gameOver) && (
        <motion.div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div 
            className="bg-background p-8 rounded-xl text-center space-y-4 max-w-md"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <Trophy className={`w-16 h-16 mx-auto ${gameComplete ? 'text-warning' : 'text-muted-foreground'}`} />
            <h2 className="text-2xl font-bold">
              {gameComplete ? 'Level Complete!' : 'Time\'s Up!'}
            </h2>
            <div className="space-y-2">
              <p>Final Score: <span className="font-bold text-primary">{score}</span></p>
              <p>Words Found: <span className="font-bold">{foundWords.length}/{targetWords.length}</span></p>
            </div>
            <div className="flex gap-2">
              {gameComplete && currentSet < wordSets.length - 1 ? (
                <Button onClick={nextLevel} className="flex-1">
                  Next Level
                </Button>
              ) : (
                <Button onClick={resetGame} className="flex-1">
                  Play Again
                </Button>
              )}
              <Button variant="outline" onClick={onBack} className="flex-1">
                Back to Games
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Letter Pool */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Available Letters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center gap-2 mb-4">
            {letters.split('').map((letter, index) => (
              <div key={index} className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center font-bold text-lg">
                {letter}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Word Input */}
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <Input
              value={currentWord}
              onChange={(e) => setCurrentWord(e.target.value.toUpperCase())}
              placeholder="Enter a word..."
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              disabled={gameComplete || gameOver}
            />
            <Button onClick={handleSubmit} disabled={gameComplete || gameOver}>
              Submit
            </Button>
          </div>
          <div className="flex justify-center mt-4">
            <Button variant="outline" size="sm" onClick={() => setShowHint(!showHint)}>
              <Lightbulb className="w-4 h-4 mr-2" />
              {showHint ? 'Hide' : 'Show'} Hint
            </Button>
          </div>
          {showHint && (
            <div className="mt-4 p-3 bg-muted rounded-lg text-center text-sm">
              Try words like: {targetWords.slice(0, 3).join(', ')}...
            </div>
          )}
        </CardContent>
      </Card>

      {/* Found Words */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Found Words ({foundWords.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {foundWords.map((word, index) => (
              <motion.div
                key={word}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-success/20 border border-success/40 rounded-lg p-2 text-center font-bold"
              >
                {word}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}