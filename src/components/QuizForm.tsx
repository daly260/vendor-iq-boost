
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";
import { useLearning } from "@/contexts/LearningContext";

interface QuizFormProps {
  isOpen: boolean;
  onClose: () => void;
  quiz?: any;
}

export const QuizForm = ({ isOpen, onClose, quiz }: QuizFormProps) => {
  const { addQuiz, updateQuiz, lessons } = useLearning();
  const [formData, setFormData] = useState({
    lessonId: quiz?.lessonId || lessons[0]?.id || 1,
    question: quiz?.question || "",
    options: quiz?.options || ["", "", "", ""],
    correctAnswer: quiz?.correctAnswer || 0,
    points: quiz?.points || 20,
    explanation: quiz?.explanation || ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (quiz) {
      updateQuiz({
        ...quiz,
        ...formData
      });
    } else {
      addQuiz(formData);
    }
    
    onClose();
    setFormData({
      lessonId: lessons[0]?.id || 1,
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      points: 20,
      explanation: ""
    });
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{quiz ? "Edit Quiz" : "Add New Quiz"}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="lessonId">Linked Lesson</Label>
              <Select 
                value={formData.lessonId.toString()} 
                onValueChange={(value) => setFormData({ ...formData, lessonId: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {lessons.map((lesson) => (
                    <SelectItem key={lesson.id} value={lesson.id.toString()}>
                      {lesson.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="question">Question</Label>
              <Textarea
                id="question"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                placeholder="Enter your quiz question..."
                required
              />
            </div>
            
            <div>
              <Label>Answer Options</Label>
              <RadioGroup 
                value={formData.correctAnswer.toString()} 
                onValueChange={(value) => setFormData({ ...formData, correctAnswer: parseInt(value) })}
                className="space-y-3"
              >
                {formData.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Input
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      required
                      className="flex-1"
                    />
                    <Label htmlFor={`option-${index}`} className="text-sm text-gray-600">
                      {index === formData.correctAnswer ? "✓ Correct" : ""}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <div>
              <Label htmlFor="explanation">Explanation</Label>
              <Textarea
                id="explanation"
                value={formData.explanation}
                onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                placeholder="Explain why this answer is correct..."
                required
              />
            </div>
            
            <div>
              <Label htmlFor="points">Points Reward</Label>
              <Input
                id="points"
                type="number"
                value={formData.points}
                onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) })}
                min="1"
                max="100"
                required
              />
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {quiz ? "Update Quiz" : "Create Quiz"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
