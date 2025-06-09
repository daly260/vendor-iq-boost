
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, MessageSquare, Bug, Lightbulb, Clock, CheckCircle, AlertCircle, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { TicketForm } from "@/components/TicketForm";
import { useTickets } from "@/contexts/TicketContext";

const Support = () => {
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'in-progress' | 'closed'>('all');

  const { getUserTickets } = useTickets();
  const userTickets = getUserTickets(1); // Current user ID

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <Clock className="w-4 h-4 text-orange-500" />;
      case 'in-progress': return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case 'closed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Clock className="w-4 h-4" />;
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'bug': return <Bug className="w-4 h-4 text-red-500" />;
      case 'question': return <MessageSquare className="w-4 h-4 text-blue-500" />;
      case 'improvement': return <Lightbulb className="w-4 h-4 text-yellow-500" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTickets = userTickets
    .filter(ticket => filterStatus === 'all' || ticket.status === filterStatus)
    .filter(ticket => 
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-purple-800 flex items-center">
              🎫 Centre de Support
            </h1>
            <p className="text-purple-600 mt-2">Gérez vos tickets et obtenez de l'aide</p>
          </div>
          <Link to="/">
            <Button variant="outline" className="flex items-center space-x-2">
              <span>← Retour au tableau de bord</span>
            </Button>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <Clock className="w-8 h-8 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold text-orange-700">
                    {userTickets.filter(t => t.status === 'open').length}
                  </p>
                  <p className="text-sm text-orange-600">Tickets ouverts</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold text-blue-700">
                    {userTickets.filter(t => t.status === 'in-progress').length}
                  </p>
                  <p className="text-sm text-blue-600">En cours</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-teal-50">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold text-green-700">
                    {userTickets.filter(t => t.status === 'closed').length}
                  </p>
                  <p className="text-sm text-green-600">Résolus</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
            <CardContent className="pt-6">
              <Button 
                className="w-full bg-purple-500 hover:bg-purple-600 h-16"
                onClick={() => setShowTicketForm(true)}
              >
                <div className="text-center">
                  <Plus className="w-6 h-6 mx-auto mb-1" />
                  <span className="text-sm">Nouveau ticket</span>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-2 border-gray-200">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Rechercher dans vos tickets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                {(['all', 'open', 'in-progress', 'closed'] as const).map((status) => (
                  <Button
                    key={status}
                    variant={filterStatus === status ? "default" : "outline"}
                    onClick={() => setFilterStatus(status)}
                    size="sm"
                  >
                    {status === 'all' ? 'Tous' : getStatusLabel(status)}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tickets List */}
        <div className="space-y-4">
          {filteredTickets.length === 0 ? (
            <Card className="border-2 border-gray-200">
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    {searchTerm ? 'Aucun ticket trouvé' : 'Aucun ticket pour le moment'}
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {searchTerm 
                      ? 'Essayez d\'ajuster vos critères de recherche'
                      : 'Créez votre premier ticket pour obtenir de l\'aide !'
                    }
                  </p>
                  {!searchTerm && (
                    <Button 
                      onClick={() => setShowTicketForm(true)}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Créer un ticket
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            filteredTickets.map((ticket) => (
              <Card key={ticket.id} className="border-2 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {getCategoryIcon(ticket.category)}
                      <div>
                        <CardTitle className="text-lg">{ticket.title}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          Ticket #{ticket.id} • Créé le {ticket.createdAt}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getPriorityColor(ticket.priority)}>
                        {ticket.priority === 'high' ? '🔴 Élevée' : 
                         ticket.priority === 'medium' ? '🟡 Moyenne' : '🟢 Faible'}
                      </Badge>
                      <Badge variant="outline" className="flex items-center space-x-1">
                        {getStatusIcon(ticket.status)}
                        <span>{getStatusLabel(ticket.status)}</span>
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{ticket.description}</p>
                  
                  {ticket.adminResponse && (
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                      <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Réponse de l'équipe
                      </h4>
                      <p className="text-blue-700">{ticket.adminResponse}</p>
                      <p className="text-xs text-blue-600 mt-2">Mis à jour le {ticket.updatedAt}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Ticket Form Modal */}
        <TicketForm 
          isOpen={showTicketForm}
          onClose={() => setShowTicketForm(false)}
        />
      </div>
    </div>
  );
};

export default Support;
