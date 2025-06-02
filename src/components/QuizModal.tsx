
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, CheckCircle, XCircle } from "lucide-react";
import { useLearning } from "@/contexts/LearningContext";

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonTitle: string;
  onComplete: (score: number) => void;
}

export const QuizModal = ({ isOpen, onClose, lessonTitle, onComplete }: QuizModalProps) => {
  const { quizzes } = useLearning();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Get quiz questions for this lesson (fallback to default questions if none exist)
  const questions = quizzes.length > 0 ? quizzes : [
    {
      id: 1,
      lessonId: 1,
      question: "What's the secret to writing product descriptions that sell? 🎯",
      options: [
        "Write a novel about the product 📚",
        "Focus on benefits, not just features ✨", 
        "Use as many emojis as possible 😜",
        "Copy from competitors 🙈"
      ],
      correctAnswer: 1,
      points: 20,
      explanation: "Benefits tell customers how the product improves their life!"
    },
    {
      id: 2,
      lessonId: 2,
      question: "Which product photo gets the most clicks? 📸",
      options: [
        "Blurry but artistic 🎨",
        "High-resolution with good lighting 💡",
        "Black and white for drama 🎭",
        "Taken with a potato 🥔"
      ],
      correctAnswer: 1,
      points: 20,
      explanation: "Clear, well-lit photos build trust and show quality!"
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      setScore(score + questions[currentQuestion].points);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsCorrect(null);
    } else {
      onComplete(score + (isCorrect ? questions[currentQuestion].points : 0));
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl">Quiz Time! 🧠</CardTitle>
            <p className="text-sm text-gray-600">{lessonTitle}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <Badge variant="outline">
                Question {currentQuestion + 1} of {questions.length}
              </Badge>
              <Badge className="bg-purple-500">
                Score: {score} XP
              </Badge>
            </div>

            <h3 className="text-lg font-semibold">
              {questions[currentQuestion].question}
            </h3>

            <div className="grid gap-3">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === index ? "default" : "outline"}
                  className={`text-left justify-start h-auto p-4 ${
                    showResult && index === questions[currentQuestion].correctAnswer
                      ? 'bg-green-100 border-green-500 text-green-800'
                      : showResult && selectedAnswer === index && index !== questions[currentQuestion].correctAnswer
                      ? 'bg-red-100 border-red-500 text-red-800'
                      : ''
                  }`}
                  onClick={() => !showResult && handleAnswerSelect(index)}
                  disabled={showResult}
                >
                  {option}
                </Button>
              ))}
            </div>

            {showResult && (
              <Card className={`border-2 ${isCorrect ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}`}>
                <CardContent className="pt-4">
                  <div className="flex items-start space-x-3">
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600 mt-1" />
                    )}
                    <div>
                      <h4 className="font-semibold text-lg">
                        {isCorrect ? "Correct! 🎉" : "Oops! 🐔"}
                      </h4>
                      <p className="text-sm mt-1">
                        {questions[currentQuestion].explanation}
                      </p>
                      {isCorrect && (
                        <Badge className="bg-green-500 text-white mt-2">
                          +{questions[currentQuestion].points} XP earned!
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {showResult && (
              <Button onClick={handleNext} className="w-full">
                {currentQuestion < questions.length - 1 ? "Next Question 🚀" : "Complete Quiz! 🏆"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
