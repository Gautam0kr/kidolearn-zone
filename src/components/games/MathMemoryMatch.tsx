import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, RotateCcw, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GameCard {
  id: number;
  equation: string;
  answer: number;
  isFlipped: boolean;
  isMatched: boolean;
}

interface MathMemoryMatchProps {
  onBack: () => void;
}

export function MathMemoryMatch({ onBack }: MathMemoryMatchProps) {
  const [cards, setCards] = useState<GameCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [timer, setTimer] = useState(0);
  const { toast } = useToast();

  const equations = [
    { equation: "5 + 3", answer: 8 },
    { equation: "12 - 4", answer: 8 },
    { equation: "2 × 6", answer: 12 },
    { equation: "24 ÷ 2", answer: 12 },
    { equation: "7 + 8", answer: 15 },
    { equation: "20 - 5", answer: 15 },
    { equation: "4 × 4", answer: 16 },
    { equation: "32 ÷ 2", answer: 16 }
  ];

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (!gameComplete) {
      const interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameComplete]);

  const initializeGame = () => {
    const gameCards: GameCard[] = [];
    equations.forEach((eq, index) => {
      gameCards.push({
        id: index * 2,
        equation: eq.equation,
        answer: eq.answer,
        isFlipped: false,
        isMatched: false
      });
      gameCards.push({
        id: index * 2 + 1,
        equation: eq.answer.toString(),
        answer: eq.answer,
        isFlipped: false,
        isMatched: false
      });
    });
    
    // Shuffle cards
    const shuffled = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setScore(0);
    setMoves(0);
    setGameComplete(false);
    setTimer(0);
  };

  const handleCardClick = (cardIndex: number) => {
    if (flippedCards.length === 2 || cards[cardIndex].isFlipped || cards[cardIndex].isMatched) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardIndex];
    setFlippedCards(newFlippedCards);

    setCards(prev => prev.map((card, index) => 
      index === cardIndex ? { ...card, isFlipped: true } : card
    ));

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      
      setTimeout(() => {
        const [firstIndex, secondIndex] = newFlippedCards;
        const firstCard = cards[firstIndex];
        const secondCard = cards[secondIndex];

        if (firstCard.answer === secondCard.answer) {
          // Match found
          setCards(prev => prev.map((card, index) => 
            index === firstIndex || index === secondIndex 
              ? { ...card, isMatched: true } 
              : card
          ));
          setScore(prev => prev + 100);
          toast({
            title: "Great match!",
            description: "Keep going!",
          });

          // Check if game is complete
          const updatedCards = cards.map((card, index) => 
            index === firstIndex || index === secondIndex 
              ? { ...card, isMatched: true } 
              : card
          );
          
          if (updatedCards.every(card => card.isMatched)) {
            setGameComplete(true);
            const bonus = Math.max(1000 - (moves * 10) - timer, 100);
            setScore(prev => prev + bonus);
            toast({
              title: "Congratulations!",
              description: `Game completed! Bonus: ${bonus} points`,
            });
          }
        } else {
          // No match
          setCards(prev => prev.map((card, index) => 
            index === firstIndex || index === secondIndex 
              ? { ...card, isFlipped: false } 
              : card
          ));
        }
        
        setFlippedCards([]);
      }, 1000);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <Home className="w-4 h-4 mr-2" />
          Back to Games
        </Button>
        <h1 className="text-2xl font-bold">Math Memory Match</h1>
        <Button variant="outline" onClick={initializeGame}>
          <RotateCcw className="w-4 h-4 mr-2" />
          New Game
        </Button>
      </div>

      {/* Game Stats */}
      <div className="flex justify-center gap-6">
        <Badge variant="secondary" className="text-lg px-4 py-2">
          Score: {score}
        </Badge>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          Moves: {moves}
        </Badge>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          Time: {formatTime(timer)}
        </Badge>
      </div>

      {/* Game Complete Modal */}
      {gameComplete && (
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
            <Trophy className="w-16 h-16 text-warning mx-auto" />
            <h2 className="text-2xl font-bold">Congratulations!</h2>
            <div className="space-y-2">
              <p>Final Score: <span className="font-bold text-primary">{score}</span></p>
              <p>Moves: <span className="font-bold">{moves}</span></p>
              <p>Time: <span className="font-bold">{formatTime(timer)}</span></p>
            </div>
            <div className="flex gap-2">
              <Button onClick={initializeGame} className="flex-1">
                Play Again
              </Button>
              <Button variant="outline" onClick={onBack} className="flex-1">
                Back to Games
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Game Board */}
      <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className="aspect-square"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card 
              className={`h-full cursor-pointer transition-all duration-300 ${
                card.isMatched 
                  ? 'bg-success/20 border-success' 
                  : card.isFlipped 
                    ? 'bg-primary/10 border-primary' 
                    : 'hover:bg-muted'
              }`}
              onClick={() => handleCardClick(index)}
            >
              <CardContent className="flex items-center justify-center h-full p-2">
                <div className="text-center">
                  {card.isFlipped || card.isMatched ? (
                    <span className="text-lg font-bold">{card.equation}</span>
                  ) : (
                    <div className="w-8 h-8 bg-primary/20 rounded"></div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Instructions */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">How to Play</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
          <p>Click cards to flip them and find matching equation-answer pairs. Complete all matches to win!</p>
        </CardContent>
      </Card>
    </div>
  );
}