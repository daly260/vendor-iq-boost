
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Play, Users, Settings, BookOpen, Award, BarChart3 } from "lucide-react";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("lessons");

  const lessons = [
    {
      id: 1,
      title: "How to Upload Products like a Boss 📦",
      videoUrl: "https://youtube.com/watch?v=example1",
      levelRequired: 1,
      status: "published",
      views: 245
    },
    {
      id: 2,
      title: "Price Like a Pro: Strategy Secrets 💰",
      videoUrl: "https://youtube.com/watch?v=example2",
      levelRequired: 2,
      status: "draft",
      views: 0
    },
    {
      id: 3,
      title: "Customer Reviews: Turn Feedback into Gold ⭐",
      videoUrl: "https://youtube.com/watch?v=example3",
      levelRequired: 2,
      status: "published",
      views: 189
    }
  ];

  const quizzes = [
    {
      id: 1,
      lessonId: 1,
      question: "What's the best way to upload a product image?",
      options: ["Use highest resolution", "Compress first", "Add watermark", "All of the above"],
      correctAnswer: 1,
      points: 20
    },
    {
      id: 2,
      lessonId: 2,
      question: "Which pricing strategy works best for new products?",
      options: ["Always lowest price", "Market research first", "Copy competitors", "Random pricing"],
      correctAnswer: 1,
      points: 25
    }
  ];

  const vendors = [
    {
      id: 1,
      username: "sarah_seller",
      level: 3,
      xp: 892,
      lessonsCompleted: 8,
      quizzesPassed: 6,
      lastActive: "2 hours ago"
    },
    {
      id: 2,
      username: "mike_merchant",
      level: 2,
      xp: 456,
      lessonsCompleted: 5,
      quizzesPassed: 3,
      lastActive: "1 day ago"
    },
    {
      id: 3,
      username: "ana_amazing",
      level: 4,
      xp: 1203,
      lessonsCompleted: 12,
      quizzesPassed: 10,
      lastActive: "30 minutes ago"
    }
  ];

  const gamificationSettings = {
    xpPerVideo: 10,
    xpPerQuiz: 20,
    xpPerStreak: 5,
    levels: [
      { level: 1, title: "Marketplace Newbie", requiredXp: 0 },
      { level: 2, title: "Marketplace Explorer", requiredXp: 100 },
      { level: 3, title: "Dashboard Guru", requiredXp: 300 },
      { level: 4, title: "Listing Legend", requiredXp: 600 },
      { level: 5, title: "Super Seller", requiredXp: 1000 }
    ]
  };

  const tabs = [
    { id: "lessons", label: "Manage Lessons", icon: BookOpen },
    { id: "quizzes", label: "Manage Quizzes", icon: Award },
    { id: "vendors", label: "Vendor Progress", icon: Users },
    { id: "settings", label: "Gamification", icon: Settings },
    { id: "analytics", label: "Analytics", icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Admin Header */}
        <Card className="border-2 border-blue-200 shadow-lg bg-gradient-to-r from-blue-100 to-indigo-100">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-blue-800">Admin Learning Center 🎓</CardTitle>
                <p className="text-blue-600">Manage content, track progress, and configure gamification</p>
              </div>
              <div className="text-4xl">🚀</div>
            </div>
          </CardHeader>
        </Card>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center space-x-2"
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </Button>
          ))}
        </div>

        {/* Content based on active tab */}
        {activeTab === "lessons" && (
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>Lesson Management</span>
              </CardTitle>
              <Button className="bg-green-500 hover:bg-green-600">
                <Plus className="w-4 h-4 mr-2" />
                Add New Lesson
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Level Required</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lessons.map((lesson) => (
                    <TableRow key={lesson.id}>
                      <TableCell className="font-medium">{lesson.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">Level {lesson.levelRequired}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={lesson.status === "published" ? "bg-green-500" : "bg-yellow-500"}>
                          {lesson.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{lesson.views}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Play className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-500">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeTab === "quizzes" && (
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>Quiz Management</span>
              </CardTitle>
              <Button className="bg-purple-500 hover:bg-purple-600">
                <Plus className="w-4 h-4 mr-2" />
                Add New Quiz
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quizzes.map((quiz) => (
                  <div key={quiz.id} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">{quiz.question}</h4>
                        <p className="text-sm text-gray-600">Linked to Lesson #{quiz.lessonId}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-purple-500">{quiz.points} XP</Badge>
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {quiz.options.map((option, index) => (
                        <div 
                          key={index} 
                          className={`p-2 text-sm rounded border ${
                            index === quiz.correctAnswer ? 'bg-green-100 border-green-300' : 'bg-white'
                          }`}
                        >
                          {index === quiz.correctAnswer && "✓ "}{option}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "vendors" && (
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Vendor Progress Tracking</span>
              </CardTitle>
              <Button variant="outline">Export CSV</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>XP</TableHead>
                    <TableHead>Lessons</TableHead>
                    <TableHead>Quizzes</TableHead>
                    <TableHead>Last Active</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vendors.map((vendor) => (
                    <TableRow key={vendor.id}>
                      <TableCell className="font-medium">{vendor.username}</TableCell>
                      <TableCell>
                        <Badge variant="outline">Level {vendor.level}</Badge>
                      </TableCell>
                      <TableCell>{vendor.xp} XP</TableCell>
                      <TableCell>{vendor.lessonsCompleted}</TableCell>
                      <TableCell>{vendor.quizzesPassed}</TableCell>
                      <TableCell className="text-sm text-gray-600">{vendor.lastActive}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeTab === "settings" && (
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>XP Rewards</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Watching a video</span>
                  <Badge>{gamificationSettings.xpPerVideo} XP</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Passing a quiz</span>
                  <Badge>{gamificationSettings.xpPerQuiz} XP</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Daily login streak</span>
                  <Badge>{gamificationSettings.xpPerStreak} XP</Badge>
                </div>
                <Button className="w-full">Update Settings</Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Level Progression</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {gamificationSettings.levels.map((level) => (
                    <div key={level.level} className="flex justify-between items-center p-2 border rounded">
                      <div>
                        <span className="font-medium">Level {level.level}</span>
                        <p className="text-sm text-gray-600">{level.title}</p>
                      </div>
                      <Badge variant="outline">{level.requiredXp} XP</Badge>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4">Edit Levels</Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Total Vendors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">127</div>
                <p className="text-sm text-gray-600">+12 this week</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Lessons Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">1,429</div>
                <p className="text-sm text-gray-600">+89 this week</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Average XP</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">347</div>
                <p className="text-sm text-gray-600">per vendor</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
