
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Lesson {
  id: number;
  title: string;
  thumbnail: string;
  videoUrl: string;
  progress: number;
  status: 'completed' | 'in-progress' | 'available' | 'locked';
  levelRequired: number;
  points: number;
  description: string;
}

interface Quiz {
  id: number;
  lessonId: number;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
  explanation: string;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  unlocked: boolean;
  icon: string;
}

interface Vendor {
  id: number;
  username: string;
  email: string;
  level: number;
  xp: number;
  lessonsCompleted: number;
  quizzesPassed: number;
  lastActive: string;
}

interface LearningContextType {
  currentLevel: number;
  currentXP: number;
  dailyStreak: number;
  lessons: Lesson[];
  quizzes: Quiz[];
  achievements: Achievement[];
  vendors: Vendor[];
  updateXP: (points: number) => void;
  completeLesson: (lessonId: number) => void;
  completeQuiz: (quizId: number, score: number) => void;
  addLesson: (lesson: Omit<Lesson, 'id'>) => void;
  updateLesson: (lesson: Lesson) => void;
  deleteLesson: (lessonId: number) => void;
  addQuiz: (quiz: Omit<Quiz, 'id'>) => void;
  updateQuiz: (quiz: Quiz) => void;
  deleteQuiz: (quizId: number) => void;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};

export const LearningProvider = ({ children }: { children: ReactNode }) => {
  const [currentLevel, setCurrentLevel] = useState(2);
  const [currentXP, setCurrentXP] = useState(145);
  const [dailyStreak, setDailyStreak] = useState(3);

  const [lessons, setLessons] = useState<Lesson[]>([
    {
      id: 1,
      title: "How to Upload Products like a Boss 📦",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop",
      videoUrl: "https://youtube.com/watch?v=example1",
      progress: 100,
      status: "completed",
      levelRequired: 1,
      points: 25,
      description: "Master the art of product uploads with pro tips"
    },
    {
      id: 2,
      title: "Price Like a Pro: Strategy Secrets 💰",
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop",
      videoUrl: "https://youtube.com/watch?v=example2",
      progress: 60,
      status: "in-progress",
      levelRequired: 2,
      points: 30,
      description: "Learn insider pricing strategies that convert"
    },
    {
      id: 3,
      title: "Customer Reviews: Turn Feedback into Gold ⭐",
      thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=225&fit=crop",
      videoUrl: "https://youtube.com/watch?v=example3",
      progress: 0,
      status: "available",
      levelRequired: 2,
      points: 35,
      description: "Transform customer feedback into business growth"
    },
    {
      id: 4,
      title: "Analytics Dashboard: Your Crystal Ball 🔮",
      thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=225&fit=crop",
      videoUrl: "https://youtube.com/watch?v=example4",
      progress: 0,
      status: "locked",
      levelRequired: 3,
      points: 40,
      description: "Unlock the secrets hidden in your data"
    }
  ]);

  const [quizzes, setQuizzes] = useState<Quiz[]>([
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
      question: "Which pricing strategy works best for new products?",
      options: ["Always lowest price", "Market research first", "Copy competitors", "Random pricing"],
      correctAnswer: 1,
      points: 25,
      explanation: "Market research helps you understand your competition and customer willingness to pay."
    }
  ]);

  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: 1, title: "Dashboard Ninja", description: "Completed first lesson", unlocked: true, icon: "⚡" },
    { id: 2, title: "Price Tag Warrior", description: "Mastered pricing strategies", unlocked: false, icon: "💪" },
    { id: 3, title: "Review Responder", description: "Handled 10 customer reviews", unlocked: false, icon: "🗣️" },
    { id: 4, title: "Analytics Wizard", description: "Used all dashboard features", unlocked: false, icon: "🧙‍♂️" }
  ]);

  const [vendors, setVendors] = useState<Vendor[]>([
    {
      id: 1,
      username: "sarah_seller",
      email: "sarah@example.com",
      level: 3,
      xp: 892,
      lessonsCompleted: 8,
      quizzesPassed: 6,
      lastActive: "2 hours ago"
    },
    {
      id: 2,
      username: "mike_merchant",
      email: "mike@example.com",
      level: 2,
      xp: 456,
      lessonsCompleted: 5,
      quizzesPassed: 3,
      lastActive: "1 day ago"
    }
  ]);

  const updateXP = (points: number) => {
    const newXP = currentXP + points;
    setCurrentXP(newXP);
    
    // Level up logic
    const levelThresholds = [0, 100, 300, 600, 1000];
    const newLevel = levelThresholds.findIndex((threshold, index) => 
      index === levelThresholds.length - 1 || newXP < levelThresholds[index + 1]
    );
    
    if (newLevel > currentLevel) {
      setCurrentLevel(newLevel);
      // Unlock new lessons
      setLessons(prev => prev.map(lesson => 
        lesson.levelRequired <= newLevel && lesson.status === 'locked'
          ? { ...lesson, status: 'available' as const }
          : lesson
      ));
    }
  };

  const completeLesson = (lessonId: number) => {
    setLessons(prev => prev.map(lesson => 
      lesson.id === lessonId 
        ? { ...lesson, status: 'completed' as const, progress: 100 }
        : lesson
    ));
    
    const lesson = lessons.find(l => l.id === lessonId);
    if (lesson && lesson.status !== 'completed') {
      updateXP(lesson.points);
    }
  };

  const completeQuiz = (quizId: number, score: number) => {
    updateXP(score);
  };

  const addLesson = (lesson: Omit<Lesson, 'id'>) => {
    const newId = Math.max(...lessons.map(l => l.id)) + 1;
    setLessons(prev => [...prev, { ...lesson, id: newId }]);
  };

  const updateLesson = (lesson: Lesson) => {
    setLessons(prev => prev.map(l => l.id === lesson.id ? lesson : l));
  };

  const deleteLesson = (lessonId: number) => {
    setLessons(prev => prev.filter(l => l.id !== lessonId));
    setQuizzes(prev => prev.filter(q => q.lessonId !== lessonId));
  };

  const addQuiz = (quiz: Omit<Quiz, 'id'>) => {
    const newId = Math.max(...quizzes.map(q => q.id)) + 1;
    setQuizzes(prev => [...prev, { ...quiz, id: newId }]);
  };

  const updateQuiz = (quiz: Quiz) => {
    setQuizzes(prev => prev.map(q => q.id === quiz.id ? quiz : q));
  };

  const deleteQuiz = (quizId: number) => {
    setQuizzes(prev => prev.filter(q => q.id !== quizId));
  };

  return (
    <LearningContext.Provider value={{
      currentLevel,
      currentXP,
      dailyStreak,
      lessons,
      quizzes,
      achievements,
      vendors,
      updateXP,
      completeLesson,
      completeQuiz,
      addLesson,
      updateLesson,
      deleteLesson,
      addQuiz,
      updateQuiz,
      deleteQuiz
    }}>
      {children}
    </LearningContext.Provider>
  );
};
