import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Play, Users, Settings, BookOpen, Award, BarChart3, Download, MessageSquare, Bug, Lightbulb, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { LessonForm } from "@/components/LessonForm";
import { QuizForm } from "@/components/QuizForm";
import { useLearning } from "@/contexts/LearningContext";
import { useTickets } from "@/contexts/TicketContext";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("lessons");
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [adminResponse, setAdminResponse] = useState("");
  const [xpSettings, setXpSettings] = useState({
    videoXP: 10,
    quizXP: 20,
    streakXP: 5
  });

  const { lessons, quizzes, vendors, deleteLesson, deleteQuiz } = useLearning();
  const { tickets, updateTicketStatus } = useTickets();
  const { toast } = useToast();

  const tabs = [
    { id: "lessons", label: "Gérer les Cours", icon: BookOpen },
    { id: "quizzes", label: "Gérer les Quiz", icon: Award },
    { id: "tickets", label: "Support Tickets", icon: MessageSquare },
    { id: "vendors", label: "Progression Vendeurs", icon: Users },
    { id: "settings", label: "Gamification", icon: Settings },
    { id: "analytics", label: "Analytiques", icon: BarChart3 }
  ];

  const handleDeleteLesson = (lessonId: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce cours ? Cela supprimera aussi les quiz associés.")) {
      deleteLesson(lessonId);
      toast({
        title: "Cours Supprimé",
        description: "Le cours et ses quiz ont été supprimés.",
      });
    }
  };

  const handleDeleteQuiz = (quizId: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce quiz ?")) {
      deleteQuiz(quizId);
      toast({
        title: "Quiz Supprimé",
        description: "Le quiz a été supprimé.",
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
      title: "CSV Exporté",
      description: "Les données de progression des vendeurs ont été téléchargées.",
    });
  };

  const handleUpdateXPSettings = () => {
    toast({
      title: "Paramètres Mis à Jour",
      description: "Les récompenses XP ont été mises à jour avec succès.",
    });
  };

  const handleTicketResponse = (ticketId: number, status: 'open' | 'in-progress' | 'closed') => {
    updateTicketStatus(ticketId, status, adminResponse);
    setAdminResponse("");
    setSelectedTicket(null);
    
    toast({
      title: "Ticket Mis à Jour",
      description: `Le ticket a été marqué comme ${status === 'closed' ? 'fermé' : status === 'in-progress' ? 'en cours' : 'ouvert'}.`,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <Clock className="w-4 h-4 text-orange-500" />;
      case 'in-progress': return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case 'closed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'bug': return <Bug className="w-4 h-4 text-red-500" />;
      case 'question': return <MessageSquare className="w-4 h-4 text-blue-500" />;
      case 'improvement': return <Lightbulb className="w-4 h-4 text-yellow-500" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'bug': return 'Bug';
      case 'question': return 'Question';
      case 'improvement': return 'Amélioration';
      default: return category;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'open': return 'Ouvert';
      case 'in-progress': return 'En cours';
      case 'closed': return 'Fermé';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Admin Header */}
        <Card className="border-2 border-blue-200 shadow-lg bg-gradient-to-r from-blue-100 to-indigo-100">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-blue-800">Centre d'Apprentissage Admin 🎓</CardTitle>
                <p className="text-blue-600">Gérez le contenu, suivez la progression et configurez la gamification</p>
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
              {tab.id === 'tickets' && tickets.filter(t => t.status === 'open').length > 0 && (
                <Badge className="bg-red-500 text-white ml-2">
                  {tickets.filter(t => t.status === 'open').length}
                </Badge>
              )}
            </Button>
          ))}
        </div>

        {/* Content based on active tab */}
        {activeTab === "lessons" && (
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>Gestion des Cours</span>
              </CardTitle>
              <Button 
                className="bg-green-500 hover:bg-green-600"
                onClick={() => {
                  setEditingLesson(null);
                  setShowLessonForm(true);
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un Nouveau Cours
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titre</TableHead>
                    <TableHead>Niveau Requis</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lessons.map((lesson) => (
                    <TableRow key={lesson.id}>
                      <TableCell className="font-medium">{lesson.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">Niveau {lesson.levelRequired}</Badge>
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
                <span>Gestion des Quiz</span>
              </CardTitle>
              <Button 
                className="bg-purple-500 hover:bg-purple-600"
                onClick={() => {
                  setEditingQuiz(null);
                  setShowQuizForm(true);
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un Nouveau Quiz
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
                          Lié à : {lessons.find(l => l.id === quiz.lessonId)?.title}
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

        {activeTab === "tickets" && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>Gestion des Tickets Support</span>
                <Badge className="bg-blue-500 text-white">
                  {tickets.length} total
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <Card key={ticket.id} className="border">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          {getCategoryIcon(ticket.category)}
                          <div>
                            <h4 className="font-semibold">{ticket.title}</h4>
                            <p className="text-sm text-gray-600">
                              Par {ticket.vendorName} • #{ticket.id} • {ticket.createdAt}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">
                            {getCategoryLabel(ticket.category)}
                          </Badge>
                          <Badge className="flex items-center space-x-1">
                            {getStatusIcon(ticket.status)}
                            <span>{getStatusLabel(ticket.status)}</span>
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{ticket.description}</p>
                      
                      {ticket.adminResponse && (
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded mb-4">
                          <h4 className="font-semibold text-blue-800 mb-2">Réponse envoyée :</h4>
                          <p className="text-blue-700">{ticket.adminResponse}</p>
                        </div>
                      )}

                      {selectedTicket?.id === ticket.id ? (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="response">Réponse administrative</Label>
                            <Textarea
                              id="response"
                              value={adminResponse}
                              onChange={(e) => setAdminResponse(e.target.value)}
                              placeholder="Tapez votre réponse..."
                              rows={3}
                            />
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm"
                              onClick={() => handleTicketResponse(ticket.id, 'in-progress')}
                              className="bg-blue-500 hover:bg-blue-600"
                            >
                              Marquer en cours
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => handleTicketResponse(ticket.id, 'closed')}
                              className="bg-green-500 hover:bg-green-600"
                            >
                              Fermer le ticket
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setSelectedTicket(null)}
                            >
                              Annuler
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setSelectedTicket(ticket)}
                          >
                            Répondre
                          </Button>
                          {ticket.status === 'open' && (
                            <Button 
                              size="sm"
                              onClick={() => handleTicketResponse(ticket.id, 'in-progress')}
                              className="bg-blue-500 hover:bg-blue-600"
                            >
                              Prendre en charge
                            </Button>
                          )}
                          {ticket.status !== 'closed' && (
                            <Button 
                              size="sm"
                              onClick={() => handleTicketResponse(ticket.id, 'closed')}
                              className="bg-gray-500 hover:bg-gray-600"
                            >
                              Fermer
                            </Button>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
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
                <span>Suivi de Progression des Vendeurs</span>
              </CardTitle>
              <Button variant="outline" onClick={handleExportCSV}>
                <Download className="w-4 h-4 mr-2" />
                Exporter CSV
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom d'utilisateur</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Niveau</TableHead>
                    <TableHead>XP</TableHead>
                    <TableHead>Cours</TableHead>
                    <TableHead>Quiz</TableHead>
                    <TableHead>Dernière activité</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vendors.map((vendor) => (
                    <TableRow key={vendor.id}>
                      <TableCell className="font-medium">{vendor.username}</TableCell>
                      <TableCell>{vendor.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">Niveau {vendor.level}</Badge>
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
                <CardTitle>Récompenses XP</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="videoXP">Regarder une vidéo</Label>
                  <Input
                    id="videoXP"
                    type="number"
                    value={xpSettings.videoXP}
                    onChange={(e) => setXpSettings({...xpSettings, videoXP: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="quizXP">Réussir un quiz</Label>
                  <Input
                    id="quizXP"
                    type="number"
                    value={xpSettings.quizXP}
                    onChange={(e) => setXpSettings({...xpSettings, quizXP: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="streakXP">Série de connexion quotidienne</Label>
                  <Input
                    id="streakXP"
                    type="number"
                    value={xpSettings.streakXP}
                    onChange={(e) => setXpSettings({...xpSettings, streakXP: parseInt(e.target.value)})}
                  />
                </div>
                <Button className="w-full" onClick={handleUpdateXPSettings}>
                  Mettre à Jour les Paramètres
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Progression des Niveaux</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { level: 1, title: "Novice Marketplace", requiredXp: 0 },
                    { level: 2, title: "Explorateur Marketplace", requiredXp: 100 },
                    { level: 3, title: "Guru Dashboard", requiredXp: 300 },
                    { level: 4, title: "Légende des Listes", requiredXp: 600 },
                    { level: 5, title: "Super Vendeur", requiredXp: 1000 }
                  ].map((level) => (
                    <div key={level.level} className="flex justify-between items-center p-2 border rounded">
                      <div>
                        <span className="font-medium">Niveau {level.level}</span>
                        <p className="text-sm text-gray-600">{level.title}</p>
                      </div>
                      <Badge variant="outline">{level.requiredXp} XP</Badge>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4">Modifier les Niveaux</Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Total Vendeurs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">{vendors.length}</div>
                <p className="text-sm text-gray-600">+2 cette semaine</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Total Cours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{lessons.length}</div>
                <p className="text-sm text-gray-600">Contenu actif</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Total Quiz</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">{quizzes.length}</div>
                <p className="text-sm text-gray-600">Vérifications de connaissances</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Tickets Support</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600">{tickets.length}</div>
                <p className="text-sm text-gray-600">
                  {tickets.filter(t => t.status === 'open').length} ouverts
                </p>
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
