
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Ticket {
  id: number;
  title: string;
  description: string;
  category: 'bug' | 'question' | 'improvement';
  status: 'open' | 'in-progress' | 'closed';
  priority: 'low' | 'medium' | 'high';
  vendorId: number;
  vendorName: string;
  createdAt: string;
  updatedAt: string;
  adminResponse?: string;
}

interface TicketContextType {
  tickets: Ticket[];
  addTicket: (ticket: Omit<Ticket, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => void;
  updateTicketStatus: (ticketId: number, status: Ticket['status'], adminResponse?: string) => void;
  getOpenTicketsCount: () => number;
  getUserTickets: (vendorId: number) => Ticket[];
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
};

export const TicketProvider = ({ children }: { children: ReactNode }) => {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 1,
      title: "Bug sur l'upload de produits",
      description: "Impossible d'uploader des images de plus de 2MB",
      category: 'bug',
      status: 'open',
      priority: 'high',
      vendorId: 1,
      vendorName: "sarah_seller",
      createdAt: "2024-01-15 14:30",
      updatedAt: "2024-01-15 14:30"
    },
    {
      id: 2,
      title: "Comment améliorer mes ventes ?",
      description: "J'aimerais des conseils pour optimiser mes annonces",
      category: 'question',
      status: 'in-progress',
      priority: 'medium',
      vendorId: 2,
      vendorName: "mike_merchant",
      createdAt: "2024-01-14 10:15",
      updatedAt: "2024-01-14 16:20",
      adminResponse: "Nous préparons un guide détaillé pour vous aider !"
    }
  ]);

  const addTicket = (ticket: Omit<Ticket, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
    const newTicket: Ticket = {
      ...ticket,
      id: Math.max(...tickets.map(t => t.id)) + 1,
      status: 'open',
      createdAt: new Date().toLocaleString('fr-FR'),
      updatedAt: new Date().toLocaleString('fr-FR')
    };
    setTickets(prev => [newTicket, ...prev]);
  };

  const updateTicketStatus = (ticketId: number, status: Ticket['status'], adminResponse?: string) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { 
            ...ticket, 
            status, 
            adminResponse,
            updatedAt: new Date().toLocaleString('fr-FR')
          }
        : ticket
    ));
  };

  const getOpenTicketsCount = () => tickets.filter(t => t.status === 'open').length;

  const getUserTickets = (vendorId: number) => tickets.filter(t => t.vendorId === vendorId);

  return (
    <TicketContext.Provider value={{
      tickets,
      addTicket,
      updateTicketStatus,
      getOpenTicketsCount,
      getUserTickets
    }}>
      {children}
    </TicketContext.Provider>
  );
};
