import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { X, Send, MessageCircle, Minimize2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  sender_type: "user" | "support";
  sender_name: string;
  message: string;
  created_at: string;
}

interface LiveChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

const LiveChatWidget = ({ isOpen, onClose }: LiveChatWidgetProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!sessionId) return;

    // Subscribe to new messages
    const channel = supabase
      .channel(`chat-${sessionId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => {
          const newMsg = payload.new as Message;
          setMessages((prev) => [...prev, newMsg]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId]);

  const startChat = async () => {
    if (!userName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name to start the chat",
        variant: "destructive",
      });
      return;
    }

    try {
      // Create a new chat session
      const { data, error } = await supabase
        .from("chat_sessions")
        .insert({
          user_name: userName,
          user_email: userEmail || null,
        })
        .select()
        .single();

      if (error) throw error;

      setSessionId(data.id);
      setIsStarted(true);

      // Send welcome message
      await supabase.from("chat_messages").insert({
        session_id: data.id,
        sender_type: "support",
        sender_name: "Support Team",
        message: `Hello ${userName}! How can we help you today?`,
      });

      toast({
        title: "Chat started",
        description: "You're now connected with our support team",
      });
    } catch (error) {
      console.error("Error starting chat:", error);
      toast({
        title: "Error",
        description: "Failed to start chat. Please try again.",
        variant: "destructive",
      });
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !sessionId) return;

    try {
      await supabase.from("chat_messages").insert({
        session_id: sessionId,
        sender_type: "user",
        sender_name: userName,
        message: newMessage,
      });

      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
        isMinimized ? "w-16 h-16" : "w-96 h-[600px]"
      }`}
    >
      {isMinimized ? (
        <Button
          onClick={() => setIsMinimized(false)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      ) : (
        <div className="glass rounded-2xl shadow-2xl flex flex-col h-full overflow-hidden border border-primary/20">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-white" />
              <h3 className="font-bold text-white">Live Chat Support</h3>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsMinimized(true)}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={onClose}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {!isStarted ? (
            // Chat start form
            <div className="flex-1 p-6 flex flex-col justify-center gap-4">
              <div>
                <h4 className="font-semibold mb-2">Start a conversation</h4>
                <p className="text-sm text-foreground/70 mb-4">
                  Our support team will respond shortly
                </p>
              </div>
              <Input
                placeholder="Your name *"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="bg-background/50"
              />
              <Input
                type="email"
                placeholder="Your email (optional)"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="bg-background/50"
              />
              <Button
                onClick={startChat}
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              >
                Start Chat
              </Button>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender_type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        msg.sender_type === "user"
                          ? "bg-gradient-to-r from-primary to-secondary text-white"
                          : "glass"
                      }`}
                    >
                      <p className="text-xs font-semibold mb-1 opacity-70">
                        {msg.sender_name}
                      </p>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border/50">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    className="bg-background/50"
                  />
                  <Button
                    onClick={sendMessage}
                    size="icon"
                    className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default LiveChatWidget;
