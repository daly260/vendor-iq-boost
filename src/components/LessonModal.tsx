
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { X, Play, CheckCircle } from "lucide-react";

interface LessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: {
    id: number;
    title: string;
    thumbnail: string;
    progress: number;
    status: string;
    points: number;
    description?: string;
  };
  onComplete: () => void;
}

export const LessonModal = ({ isOpen, onClose, lesson, onComplete }: LessonModalProps) => {
  const [watchProgress, setWatchProgress] = useState(lesson.progress);
  const [isWatching, setIsWatching] = useState(false);

  const handleStartWatching = () => {
    setIsWatching(true);
    // Simulate video progress
    const interval = setInterval(() => {
      setWatchProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsWatching(false);
          if (lesson.status !== "completed") {
            onComplete();
          }
          return 100;
        }
        return prev + 10;
      });
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">{lesson.title}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Video Player Area */}
            <div className="relative">
              <img 
                src={lesson.thumbnail} 
                alt={lesson.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-lg">
                {!isWatching ? (
                  <Button 
                    size="lg" 
                    onClick={handleStartWatching}
                    className="bg-white text-black hover:bg-gray-100"
                  >
                    <Play className="w-6 h-6 mr-2" />
                    {watchProgress > 0 ? "Continue Watching" : "Start Lesson"}
                  </Button>
                ) : (
                  <div className="text-white text-center">
                    <div className="text-2xl mb-2">📺</div>
                    <p>Video Playing...</p>
                  </div>
                )}
              </div>
            </div>

            {/* Progress Section */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Lesson Progress</span>
                <span className="text-sm">{watchProgress}%</span>
              </div>
              <Progress value={watchProgress} className="h-3" />
              
              {watchProgress === 100 && (
                <Card className="border-2 border-green-300 bg-green-50">
                  <CardContent className="pt-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <div>
                        <h4 className="font-semibold text-green-800">Lesson Complete! 🎉</h4>
                        <p className="text-sm text-green-700">You earned {lesson.points} XP!</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Lesson Description */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold mb-2">What you'll learn:</h4>
              <p className="text-sm text-gray-700 mb-3">{lesson.description}</p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Master the art of product uploads</li>
                <li>• Learn pro tips for better conversions</li>
                <li>• Avoid common mistakes that hurt sales</li>
                <li>• Get insider secrets from top sellers</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
