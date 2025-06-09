
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, MessageSquare, Bug, Lightbulb } from "lucide-react";
import { useTickets } from "@/contexts/TicketContext";
import { useToast } from "@/hooks/use-toast";

interface TicketFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TicketForm = ({ isOpen, onClose }: TicketFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<'bug' | 'question' | 'improvement'>('question');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  
  const { addTicket } = useTickets();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    addTicket({
      title,
      description,
      category,
      priority,
      vendorId: 1, // Current user ID (simulé)
      vendorName: "Vous"
    });

    toast({
      title: "Ticket créé ! 🎫",
      description: "Votre demande a été envoyée avec succès",
    });

    // Reset form
    setTitle("");
    setDescription("");
    setCategory('question');
    setPriority('medium');
    onClose();
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'bug': return <Bug className="w-4 h-4" />;
      case 'question': return <MessageSquare className="w-4 h-4" />;
      case 'improvement': return <Lightbulb className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl flex items-center space-x-2">
            <span>🎫</span>
            <span>Créer un ticket</span>
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Titre du ticket *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Décrivez brièvement votre demande..."
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Catégorie</Label>
                <Select value={category} onValueChange={(value: any) => setCategory(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bug">
                      <div className="flex items-center space-x-2">
                        <Bug className="w-4 h-4" />
                        <span>🐛 Signaler un bug</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="question">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="w-4 h-4" />
                        <span>❓ Poser une question</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="improvement">
                      <div className="flex items-center space-x-2">
                        <Lightbulb className="w-4 h-4" />
                        <span>💡 Suggérer une amélioration</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Priorité</Label>
                <Select value={priority} onValueChange={(value: any) => setPriority(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">🟢 Faible</SelectItem>
                    <SelectItem value="medium">🟡 Moyenne</SelectItem>
                    <SelectItem value="high">🔴 Élevée</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description détaillée *</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Décrivez votre problème ou votre demande en détail..."
                rows={4}
                required
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center">
                {getCategoryIcon(category)}
                <span className="ml-2">Conseils pour votre {category === 'bug' ? 'rapport de bug' : category === 'question' ? 'question' : 'suggestion'}</span>
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                {category === 'bug' && (
                  <>
                    <li>• Décrivez les étapes pour reproduire le problème</li>
                    <li>• Mentionnez votre navigateur et appareil</li>
                    <li>• Ajoutez des captures d'écran si possible</li>
                  </>
                )}
                {category === 'question' && (
                  <>
                    <li>• Soyez précis dans votre question</li>
                    <li>• Mentionnez ce que vous avez déjà essayé</li>
                    <li>• Consultez d'abord nos tutoriels</li>
                  </>
                )}
                {category === 'improvement' && (
                  <>
                    <li>• Expliquez le problème actuel</li>
                    <li>• Proposez votre solution</li>
                    <li>• Décrivez les bénéfices attendus</li>
                  </>
                )}
              </ul>
            </div>

            <div className="flex space-x-3">
              <Button type="submit" className="flex-1 bg-blue-500 hover:bg-blue-600">
                🚀 Envoyer le ticket
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Annuler
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
