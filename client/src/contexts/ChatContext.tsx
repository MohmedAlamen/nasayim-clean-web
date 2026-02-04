import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

export interface ChatMessage {
  id: number;
  conversationId: number;
  senderId: number;
  senderRole: "customer" | "support" | "admin";
  message: string;
  isRead: boolean;
  createdAt: Date;
}

export interface Conversation {
  id: number;
  userId: number;
  supportAgentId?: number;
  subject: string;
  status: "open" | "closed" | "pending";
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

interface ChatContextType {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  isLoading: boolean;
  error: string | null;
  unreadCount: number;
  startConversation: (subject: string) => Promise<void>;
  selectConversation: (conversationId: number) => void;
  sendMessage: (conversationId: number, message: string) => Promise<void>;
  closeConversation: (conversationId: number) => Promise<void>;
  markAsRead: (conversationId: number) => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const unreadCount = conversations.reduce((count, conv) => {
    return count + conv.messages.filter(msg => !msg.isRead).length;
  }, 0);

  const startConversation = useCallback(async (subject: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/chat/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject }),
      });
      if (!response.ok) throw new Error("Failed to start conversation");
      const newConversation = await response.json();
      setConversations(prev => [...prev, newConversation]);
      setCurrentConversation(newConversation);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error starting conversation");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const selectConversation = useCallback((conversationId: number) => {
    const conversation = conversations.find(c => c.id === conversationId);
    if (conversation) {
      setCurrentConversation(conversation);
    }
  }, [conversations]);

  const sendMessage = useCallback(async (conversationId: number, message: string) => {
    try {
      const response = await fetch(`/api/chat/conversations/${conversationId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      if (!response.ok) throw new Error("Failed to send message");
      const newMessage = await response.json();
      
      setConversations(prev =>
        prev.map(conv =>
          conv.id === conversationId
            ? { ...conv, messages: [...conv.messages, newMessage] }
            : conv
        )
      );
      
      if (currentConversation?.id === conversationId) {
        setCurrentConversation(prev =>
          prev ? { ...prev, messages: [...prev.messages, newMessage] } : null
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error sending message");
    }
  }, [currentConversation]);

  const closeConversation = useCallback(async (conversationId: number) => {
    try {
      const response = await fetch(`/api/chat/conversations/${conversationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "closed" }),
      });
      if (!response.ok) throw new Error("Failed to close conversation");
      
      setConversations(prev =>
        prev.map(conv =>
          conv.id === conversationId ? { ...conv, status: "closed" } : conv
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error closing conversation");
    }
  }, []);

  const markAsRead = useCallback(async (conversationId: number) => {
    try {
      await fetch(`/api/chat/conversations/${conversationId}/mark-read`, {
        method: "POST",
      });
      
      setConversations(prev =>
        prev.map(conv =>
          conv.id === conversationId
            ? {
                ...conv,
                messages: conv.messages.map(msg => ({ ...msg, isRead: true })),
              }
            : conv
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error marking as read");
    }
  }, []);

  return (
    <ChatContext.Provider
      value={{
        conversations,
        currentConversation,
        isLoading,
        error,
        unreadCount,
        startConversation,
        selectConversation,
        sendMessage,
        closeConversation,
        markAsRead,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within ChatProvider");
  }
  return context;
}
