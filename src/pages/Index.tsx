
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Gift, Calendar, Users, Award, Coins, Flag } from "lucide-react";

const Index = () => {
  const [currentLevel] = useState(2);
  const [currentXP] = useState(145);
  const [nextLevelXP] = useState(200);
  const [dailyStreak] = useState(3);

  const lessons = [
    {
      id: 1,
      title: "How to Upload Products like a Boss 📦",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop",
      progress: 100,
      status: "completed",
      levelRequired: 1,
      points: 25
    },
    {
      id: 2,
      title: "Price Like a Pro: Strategy Secrets 💰",
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop",
      progress: 60,
      status: "in-progress",
      levelRequired: 2,
      points: 30
    },
    {
      id: 3,
      title: "Customer Reviews: Turn Feedback into Gold ⭐",
      thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=225&fit=crop",
      progress: 0,
      status: "available",
      levelRequired: 2,
      points: 35
    },
    {
      id: 4,
      title: "Analytics Dashboard: Your Crystal Ball 🔮",
      thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=225&fit=crop",
      progress: 0,
      status: "locked",
      levelRequired: 3,
      points: 40
    }
  ];

  const achievements = [
    { id: 1, title: "Dashboard Ninja", description: "Completed first lesson", unlocked: true, icon: "⚡" },
    { id: 2, title: "Price Tag Warrior", description: "Mastered pricing strategies", unlocked: false, icon: "💪" },
    { id: 3, title: "Review Responder", description: "Handled 10 customer reviews", unlocked: false, icon: "🗣️" },
    { id: 4, title: "Analytics Wizard", description: "Used all dashboard features", unlocked: false, icon: "🧙‍♂️" }
  ];

  const leaderboard = [
    { name: "Sarah M.", level: "Super Seller", xp: 892, avatar: "🌟" },
    { name: "Mike T.", level: "Listing Legend", xp: 756, avatar: "🚀" },
    { name: "Ana K.", level: "Price Master", xp: 643, avatar: "💎" },
    { name: "You", level: "Marketplace Explorer", xp: 145, avatar: "😎" },
    { name: "Tom R.", level: "Newbie Navigator", xp: 89, avatar: "🌱" }
  ];

  const getLessonStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 border-green-300";
      case "in-progress": return "bg-blue-100 border-blue-300";
      case "available": return "bg-yellow-100 border-yellow-300";
      case "locked": return "bg-gray-100 border-gray-300";
      default: return "bg-gray-100";
    }
  };

  const getLessonButton = (lesson: any) => {
    if (lesson.status === "completed") {
      return <Button className="w-full bg-green-500 hover:bg-green-600">Review Again 🔄</Button>;
    } else if (lesson.status === "in-progress") {
      return <Button className="w-full bg-blue-500 hover:bg-blue-600">Continue Learning 📚</Button>;
    } else if (lesson.status === "available") {
      return <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">Start Lesson 🚀</Button>;
    } else {
      return <Button disabled className="w-full">Unlock at Level {lesson.levelRequired} 🔒</Button>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Learning Progress Header */}
        <Card className="border-2 border-purple-200 shadow-lg bg-gradient-to-r from-purple-100 to-blue-100">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-6xl animate-bounce">😎</div>
                <div>
                  <h1 className="text-2xl font-bold text-purple-800">Vendor IQ Meter</h1>
                  <p className="text-lg text-purple-600">Level {currentLevel} – Marketplace Explorer</p>
                  <p className="text-sm text-purple-500">{currentXP} XP – Keep it up, entrepreneur! 🎉</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-medium">Daily Streak:</span>
                  <Badge className="bg-orange-500 text-white animate-pulse">
                    🔥 {dailyStreak} days
                  </Badge>
                </div>
                <p className="text-xs text-gray-600">You're on fire!</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to Level {currentLevel + 1}</span>
                <span>{currentXP}/{nextLevelXP} XP</span>
              </div>
              <Progress value={(currentXP / nextLevelXP) * 100} className="h-3" />
              <p className="text-xs text-center text-purple-600">
                Just {nextLevelXP - currentXP} XP to unlock "Dashboard Guru" level! 🏆
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
                Your Learning Journey
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {lessons.map((lesson) => (
                  <Card key={lesson.id} className={`border-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${getLessonStatusColor(lesson.status)}`}>
                    <CardHeader className="pb-3">
                      <img 
                        src={lesson.thumbnail} 
                        alt={lesson.title}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <CardTitle className="text-lg">{lesson.title}</CardTitle>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="flex items-center space-x-1">
                          <Coins className="w-3 h-3" />
                          <span>{lesson.points} XP</span>
                        </Badge>
                        {lesson.status === "completed" && (
                          <Badge className="bg-green-500 text-white">✅ Completed</Badge>
                        )}
                        {lesson.status === "locked" && (
                          <Badge variant="outline">🔒 Level {lesson.levelRequired}</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {lesson.progress > 0 && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
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
                  Achievement Showcase
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
                          <Badge className="bg-green-500 text-white ml-auto">Unlocked!</Badge>
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
                  Streak Power! 🔥
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-3">
                  <div className="text-3xl font-bold text-orange-600">{dailyStreak}</div>
                  <p className="text-sm">Days in a row!</p>
                  <div className="grid grid-cols-7 gap-1 text-xs">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
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
                    Take Daily Quiz! 🧠
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Leaderboard */}
            <Card className="border-2 border-purple-200 shadow-lg bg-gradient-to-b from-purple-50 to-pink-50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Users className="mr-2 text-purple-600" />
                  Top Learners 🏆
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
                        <p className="font-semibold text-sm">{user.name}</p>
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
                  <p className="text-sm font-medium text-green-800">Psst... Daily Tip!</p>
                  <p className="text-xs text-green-700">
                    Complete a lesson before noon to earn bonus XP! ⏰
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
