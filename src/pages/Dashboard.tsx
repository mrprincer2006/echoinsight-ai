import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RecordingModal from "@/components/RecordingModal";
import { Button } from "@/components/ui/button";
import { Mic, FileText, Brain, Calendar, LogOut, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Conversation {
  id: string;
  title: string;
  created_at: string;
  duration_seconds: number | null;
  participant_count: number;
  status: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isRecordingModalOpen, setIsRecordingModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        fetchConversations(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        fetchConversations(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Real-time subscription for new conversations
  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel('conversations-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'conversations',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          setConversations(prev => [payload.new as Conversation, ...prev]);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'conversations',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          setConversations(prev => 
            prev.map(conv => conv.id === payload.new.id ? payload.new as Conversation : conv)
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  const fetchConversations = async (userId: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setConversations(data || []);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      toast({
        title: "Error loading conversations",
        description: "Please refresh the page",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You've been successfully signed out.",
    });
    navigate("/");
  };

  if (!user) {
    return null;
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
    return date.toLocaleDateString();
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return '0 min';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} min${secs > 0 ? ` ${secs}s` : ''}`;
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 sm:pt-32 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="mb-12 animate-fade-in flex justify-between items-start">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-4">
                Your <span className="text-gradient">Digital Vault</span>
              </h1>
              <p className="text-lg text-foreground/70">
                Manage and explore your conversation insights
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-foreground/60">Signed in as</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => navigate("/profile")}>
                  Profile
                </Button>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 animate-fade-in-up">
            <Button 
              onClick={() => setIsRecordingModalOpen(true)}
              className="h-auto flex-col gap-3 py-6 bg-gradient-to-br from-primary to-secondary hover:opacity-90"
            >
              <Mic className="w-8 h-8" />
              <span className="font-semibold">New Recording</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-3 py-6 border-accent/50 hover:bg-accent/10">
              <FileText className="w-8 h-8 text-accent" />
              <span className="font-semibold">View Summaries</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-3 py-6 border-secondary/50 hover:bg-secondary/10">
              <Brain className="w-8 h-8 text-secondary" />
              <span className="font-semibold">AI Insights</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-3 py-6 border-orange/50 hover:bg-orange/10">
              <Calendar className="w-8 h-8 text-orange" />
              <span className="font-semibold">Flashcards</span>
            </Button>
          </div>

          {/* Recent Conversations */}
          <div className="glass rounded-2xl p-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-2xl font-bold font-heading mb-6">Recent Conversations</h2>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : conversations.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-foreground/60 mb-4">No recordings yet</p>
                <Button onClick={() => setIsRecordingModalOpen(true)} variant="outline">
                  <Mic className="w-4 h-4 mr-2" />
                  Create your first recording
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    className="bg-card/50 rounded-xl p-6 hover:bg-card/80 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                            {conv.title}
                          </h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            conv.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                            conv.status === 'processing' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {conv.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-foreground/60">
                          <span>{formatTimeAgo(conv.created_at)}</span>
                          <span>•</span>
                          <span>{formatDuration(conv.duration_seconds)}</span>
                          <span>•</span>
                          <span>{conv.participant_count} participant{conv.participant_count !== 1 ? 's' : ''}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        View →
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <RecordingModal 
        open={isRecordingModalOpen} 
        onOpenChange={setIsRecordingModalOpen} 
      />

      <Footer />
    </div>
  );
};

export default Dashboard;
