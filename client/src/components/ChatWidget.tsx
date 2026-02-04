import React, { useState, useRef, useEffect } from "react";
import { useChat } from "@/contexts/ChatContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ChatWidget() {
  const { t, language, isRTL } = useLanguage();
  const { currentConversation, startConversation, sendMessage, isLoading, unreadCount } = useChat();
  const [isOpen, setIsOpen] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentConversation?.messages]);

  const handleStartChat = async () => {
    try {
      await startConversation(language === "en" ? "Customer Support" : "دعم العملاء");
      setIsOpen(true);
    } catch (error) {
      toast.error(language === "en" ? "Failed to start chat" : "فشل في بدء الدردشة");
    }
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !currentConversation) return;

    const message = messageInput;
    setMessageInput("");

    try {
      await sendMessage(currentConversation.id, message);
    } catch (error) {
      toast.error(language === "en" ? "Failed to send message" : "فشل في إرسال الرسالة");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={handleStartChat}
        className="fixed bottom-6 right-6 bg-primary text-white rounded-full p-4 shadow-lg hover:bg-primary/90 transition-all duration-300 hover:scale-110 z-40"
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-96 flex flex-col shadow-2xl z-40" dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="bg-primary text-white p-4 rounded-t-lg flex items-center justify-between">
        <h3 className="font-semibold">{t("chat.title") || "Support Chat"}</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="hover:bg-primary/80 p-1 rounded transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
        {currentConversation?.messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
            {t("chat.noMessages") || "No messages yet"}
          </div>
        ) : (
          currentConversation?.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.senderRole === "customer" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.senderRole === "customer"
                    ? "bg-primary text-white rounded-br-none"
                    : "bg-muted text-foreground rounded-bl-none"
                }`}
              >
                <p className="text-sm break-words">{msg.message}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border p-4 flex gap-2">
        <Input
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyPress={handleKeyPress}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          placeholder={t("chat.placeholder") || "Type a message..."}
          className="flex-1"
          disabled={isLoading}
        />
        <Button
          onClick={handleSendMessage}
          disabled={isLoading || !messageInput.trim()}
          size="icon"
          className="bg-primary hover:bg-primary/90"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </Button>
      </div>

      {/* Status */}
      {currentConversation?.status === "closed" && (
        <div className="bg-yellow-50 dark:bg-yellow-950 border-t border-yellow-200 dark:border-yellow-800 p-2 text-center text-xs text-yellow-800 dark:text-yellow-200">
          {t("chat.conversationClosed") || "This conversation is closed"}
        </div>
      )}
    </Card>
  );
}
