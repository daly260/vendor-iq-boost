import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Calendar, Users, Coins, Settings, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { QuizModal } from "@/components/QuizModal";
import { LessonModal } from "@/components/LessonModal";
import { useLearning } from "@/contexts/LearningContext";
import { useTickets } from "@/contexts/TicketContext";

const Index = () => {
  const {
    currentLevel,
    currentXP,
    dailyStreak,
    lessons,
    achievements,
    completeLesson,
    completeQuiz
  } = useLearning();
  
  const { getOpenTicketsCount } = useTickets();
  const openTicketsCount = getOpenTicketsCount();
  
  const [nextLevelXP] = useState(300);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showLesson, setShowLesson] = useState(false);

  const leaderboard = [
    { name: "Sarah M.", level: "Super Seller", xp: 892, avatar: "🌟" },
    { name: "Mike T.", level: "Listing Legend", xp: 756, avatar: "🚀" },
    { name: "Ana K.", level: "Price Master", xp: 643, avatar: "💎" },
    { name: "You", level: "Marketplace Explorer", xp: currentXP, avatar: "😎" },
    { name: "Tom R.", level: "Newbie Navigator", xp: 89, avatar: "🌱" }
  ].sort((a, b) => b.xp - a.xp);

  const getLessonStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 border-green-300";
      case "in-progress": return "bg-blue-100 border-blue-300";
      case "available": return "bg-yellow-100 border-yellow-300";
      case "locked": return "bg-gray-100 border-gray-300";
      default: return "bg-gray-100";
    }
  };

  const handleLessonClick = (lesson: any) => {
    if (lesson.status === "locked") return;
    setSelectedLesson(lesson);
    setShowLesson(true);
  };

  const handleLessonComplete = () => {
    if (selectedLesson && selectedLesson.status !== "completed") {
      completeLesson(selectedLesson.id);
      setShowLesson(false);
      setShowQuiz(true);
    }
  };

  const handleQuizComplete = (score: number) => {
    completeQuiz(selectedLesson?.id, score);
    setShowQuiz(false);
  };

  const getLessonButton = (lesson: any) => {
    if (lesson.status === "completed") {
      return (
        <Button 
          className="w-full bg-green-500 hover:bg-green-600"
          onClick={() => handleLessonClick(lesson)}
        >
          Revoir le cours 🔄
        </Button>
      );
    } else if (lesson.status === "in-progress") {
      return (
        <Button 
          className="w-full bg-blue-500 hover:bg-blue-600"
          onClick={() => handleLessonClick(lesson)}
        >
          Continuer 📚
        </Button>
      );
    } else if (lesson.status === "available") {
      return (
        <Button 
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
          onClick={() => handleLessonClick(lesson)}
        >
          Commencer 🚀
        </Button>
      );
    } else {
      return <Button disabled className="w-full">Niveau {lesson.levelRequired} requis 🔒</Button>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Navigation Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-purple-800">🎓 Centre d'Apprentissage Vendeur</h1>
          <div className="flex space-x-3">
            <Link to="/support">
              <Button variant="outline" className="flex items-center space-x-2 relative">
                <MessageSquare className="w-4 h-4" />
                <span>Support</span>
                {openTicketsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {openTicketsCount}
                  </Badge>
                )}
              </Button>
            </Link>
            <Link to="/admin">
              <Button variant="outline" className="flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Admin</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Learning Progress Header */}
        <Card className="border-2 border-purple-200 shadow-lg bg-gradient-to-r from-purple-100 to-blue-100">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-6xl animate-bounce">😎</div>
                <div>
                  <h1 className="text-2xl font-bold text-purple-800">Compteur d'IQ Vendeur</h1>
                  <p className="text-lg text-purple-600">Niveau {currentLevel} – Explorateur Marketplace</p>
                  <p className="text-sm text-purple-500">{currentXP} XP – Continue comme ça, entrepreneur ! 🎉</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-medium">Série quotidienne :</span>
                  <Badge className="bg-orange-500 text-white animate-pulse">
                    🔥 {dailyStreak} jours
                  </Badge>
                </div>
                <p className="text-xs text-gray-600">Tu es en feu !</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progression vers le Niveau {currentLevel + 1}</span>
                <span>{currentXP}/{nextLevelXP} XP</span>
              </div>
              <Progress value={(currentXP / nextLevelXP) * 100} className="h-3" />
              <p className="text-xs text-center text-purple-600">
                Plus que {nextLevelXP - currentXP} XP pour débloquer le niveau "Guru Dashboard" ! 🏆
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Lessons Grid */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <Star className="mr-2 text-yellow-500" />
                Votre Parcours d'Apprentissage
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {lessons.map((lesson) => (
                  <Card key={lesson.id} className={`border-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${getLessonStatusColor(lesson.status)}`}>
                    <CardHeader className="pb-3">
                      <img 
                        src={lesson.thumbnail} 
                        alt={lesson.title}
                        className="w-full h-32 object-cover rounded-lg mb-3 cursor-pointer"
                        onClick={() => handleLessonClick(lesson)}
                      />
                      <CardTitle className="text-lg">{lesson.title}</CardTitle>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="flex items-center space-x-1">
                          <Coins className="w-3 h-3" />
                          <span>{lesson.points} XP</span>
                        </Badge>
                        {lesson.status === "completed" && (
                          <Badge className="bg-green-500 text-white">✅ Terminé</Badge>
                        )}
                        {lesson.status === "locked" && (
                          <Badge variant="outline">🔒 Niveau {lesson.levelRequired}</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-gray-600">{lesson.description}</p>
                      {lesson.progress > 0 && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Progression</span>
                            <span>{lesson.progress}%</span>
                          </div>
                          <Progress value={lesson.progress} className="h-2" />
                        </div>
                      )}
                      {getLessonButton(lesson)}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <Card className="border-2 border-yellow-200 shadow-lg bg-gradient-to-r from-yellow-50 to-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Trophy className="mr-2 text-yellow-600" />
                  Vitrine des Réalisations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <div 
                      key={achievement.id} 
                      className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                        achievement.unlocked 
                          ? 'bg-yellow-100 border-yellow-300 shadow-md' 
                          : 'bg-gray-50 border-gray-200 opacity-60'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{achievement.icon}</span>
                        <div>
                          <h4 className="font-semibold">{achievement.title}</h4>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                        </div>
                        {achievement.unlocked && (
                          <Badge className="bg-green-500 text-white ml-auto">Débloqué !</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Daily Streak */}
            <Card className="border-2 border-orange-200 shadow-lg bg-gradient-to-b from-orange-50 to-red-50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Calendar className="mr-2 text-orange-600" />
                  Puissance de Série ! 🔥
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-3">
                  <div className="text-3xl font-bold text-orange-600">{dailyStreak}</div>
                  <p className="text-sm">Jours d'affilée !</p>
                  <div className="grid grid-cols-7 gap-1 text-xs">
                    {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => (
                      <div 
                        key={i} 
                        className={`w-8 h-8 rounded flex items-center justify-center ${
                          i < dailyStreak ? 'bg-orange-500 text-white' : 'bg-gray-200'
                        }`}
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                  <Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600">
                    Quiz quotidien ! 🧠
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Leaderboard */}
            <Card className="border-2 border-purple-200 shadow-lg bg-gradient-to-b from-purple-50 to-pink-50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Users className="mr-2 text-purple-600" />
                  Top Apprenants 🏆
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((user, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center space-x-3 p-2 rounded-lg ${
                        user.name === "You" ? 'bg-purple-100 border-2 border-purple-300' : 'bg-white'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-purple-600">#{index + 1}</span>
                        <span className="text-xl">{user.avatar}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{user.name === "You" ? "Vous" : user.name}</p>
                        <p className="text-xs text-gray-600">{user.level}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {user.xp} XP
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Fun Tip */}
            <Card className="border-2 border-green-200 shadow-lg bg-gradient-to-b from-green-50 to-teal-50">
              <CardContent className="pt-6">
                <div className="text-center space-y-3">
                  <div className="text-3xl">💡</div>
                  <p className="text-sm font-medium text-green-800">Psst... Conseil du jour !</p>
                  <p className="text-xs text-green-700">
                    Terminez un cours avant midi pour gagner des XP bonus ! ⏰
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Modals */}
        {selectedLesson && (
          <LessonModal
            isOpen={showLesson}
            onClose={() => setShowLesson(false)}
            lesson={selectedLesson}
            onComplete={handleLessonComplete}
          />
        )}

        {selectedLesson && (
          <QuizModal
            isOpen={showQuiz}
            onClose={() => setShowQuiz(false)}
            lessonTitle={selectedLesson.title}
            onComplete={handleQuizComplete}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
