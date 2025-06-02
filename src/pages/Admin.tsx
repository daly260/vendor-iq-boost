
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Play, Users, Settings, BookOpen, Award, BarChart3, Download } from "lucide-react";
import { LessonForm } from "@/components/LessonForm";
import { QuizForm } from "@/components/QuizForm";
import { useLearning } from "@/contexts/LearningContext";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("lessons");
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [xpSettings, setXpSettings] = useState({
    videoXP: 10,
    quizXP: 20,
    streakXP: 5
  });

  const { lessons, quizzes, vendors, deleteLesson, deleteQuiz } = useLearning();
  const { toast } = useToast();

  const tabs = [
    { id: "lessons", label: "Manage Lessons", icon: BookOpen },
    { id: "quizzes", label: "Manage Quizzes", icon: Award },
    { id: "vendors", label: "Vendor Progress", icon: Users },
    { id: "settings", label: "Gamification", icon: Settings },
    { id: "analytics", label: "Analytics", icon: BarChart3 }
  ];

  const handleDeleteLesson = (lessonId: number) => {
    if (confirm("Are you sure you want to delete this lesson? This will also delete associated quizzes.")) {
      deleteLesson(lessonId);
      toast({
        title: "Lesson Deleted",
        description: "The lesson and its quizzes have been removed.",
      });
    }
  };

  const handleDeleteQuiz = (quizId: number) => {
    if (confirm("Are you sure you want to delete this quiz?")) {
      deleteQuiz(quizId);
      toast({
        title: "Quiz Deleted",
        description: "The quiz has been removed.",
      });
    }
  };

  const handleEditLesson = (lesson: any) => {
    setEditingLesson(lesson);
    setShowLessonForm(true);
  };

  const handleEditQuiz = (quiz: any) => {
    setEditingQuiz(quiz);
    setShowQuizForm(true);
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Username,Email,Level,XP,Lessons Completed,Quizzes Passed,Last Active\n"
      + vendors.map(v => `${v.username},${v.email},${v.level},${v.xp},${v.lessonsCompleted},${v.quizzesPassed},${v.lastActive}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "vendor-progress.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "CSV Exported",
      description: "Vendor progress data has been downloaded.",
    });
  };

  const handleUpdateXPSettings = () => {
    toast({
      title: "Settings Updated",
      description: "XP rewards have been updated successfully.",
    });
  };

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
              <Button 
                className="bg-green-500 hover:bg-green-600"
                onClick={() => {
                  setEditingLesson(null);
                  setShowLessonForm(true);
                }}
              >
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
                    <TableHead>Points</TableHead>
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
                        <Badge className={lesson.status === "completed" ? "bg-green-500" : "bg-yellow-500"}>
                          {lesson.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{lesson.points} XP</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Play className="w-3 h-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleEditLesson(lesson)}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-red-500"
                            onClick={() => handleDeleteLesson(lesson.id)}
                          >
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
              <Button 
                className="bg-purple-500 hover:bg-purple-600"
                onClick={() => {
                  setEditingQuiz(null);
                  setShowQuizForm(true);
                }}
              >
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
                        <p className="text-sm text-gray-600">
                          Linked to: {lessons.find(l => l.id === quiz.lessonId)?.title}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-purple-500">{quiz.points} XP</Badge>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEditQuiz(quiz)}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-red-500"
                          onClick={() => handleDeleteQuiz(quiz.id)}
                        >
                          <Trash2 className="w-3 h-3" />
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
              <Button variant="outline" onClick={handleExportCSV}>
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>Email</TableHead>
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
                      <TableCell>{vendor.email}</TableCell>
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
                <div>
                  <Label htmlFor="videoXP">Watching a video</Label>
                  <Input
                    id="videoXP"
                    type="number"
                    value={xpSettings.videoXP}
                    onChange={(e) => setXpSettings({...xpSettings, videoXP: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="quizXP">Passing a quiz</Label>
                  <Input
                    id="quizXP"
                    type="number"
                    value={xpSettings.quizXP}
                    onChange={(e) => setXpSettings({...xpSettings, quizXP: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="streakXP">Daily login streak</Label>
                  <Input
                    id="streakXP"
                    type="number"
                    value={xpSettings.streakXP}
                    onChange={(e) => setXpSettings({...xpSettings, streakXP: parseInt(e.target.value)})}
                  />
                </div>
                <Button className="w-full" onClick={handleUpdateXPSettings}>
                  Update Settings
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Level Progression</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { level: 1, title: "Marketplace Newbie", requiredXp: 0 },
                    { level: 2, title: "Marketplace Explorer", requiredXp: 100 },
                    { level: 3, title: "Dashboard Guru", requiredXp: 300 },
                    { level: 4, title: "Listing Legend", requiredXp: 600 },
                    { level: 5, title: "Super Seller", requiredXp: 1000 }
                  ].map((level) => (
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
                <div className="text-3xl font-bold text-blue-600">{vendors.length}</div>
                <p className="text-sm text-gray-600">+2 this week</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Total Lessons</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{lessons.length}</div>
                <p className="text-sm text-gray-600">Active content</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Total Quizzes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">{quizzes.length}</div>
                <p className="text-sm text-gray-600">Knowledge checks</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Forms */}
        <LessonForm
          isOpen={showLessonForm}
          onClose={() => {
            setShowLessonForm(false);
            setEditingLesson(null);
          }}
          lesson={editingLesson}
        />

        <QuizForm
          isOpen={showQuizForm}
          onClose={() => {
            setShowQuizForm(false);
            setEditingQuiz(null);
          }}
          quiz={editingQuiz}
        />
      </div>
    </div>
  );
};

export default Admin;
