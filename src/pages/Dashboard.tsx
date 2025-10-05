import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RecordingModal from "@/components/RecordingModal";
import { Button } from "@/components/ui/button";
import { Mic, FileText, Brain, Calendar } from "lucide-react";

const Dashboard = () => {
  const [isRecordingModalOpen, setIsRecordingModalOpen] = useState(false);

  const recentConversations = [
    {
      title: "Team Meeting - Q4 Planning",
      date: "2 hours ago",
      duration: "45 min",
      participants: 5,
    },
    {
      title: "Client Call - Product Demo",
      date: "Yesterday",
      duration: "30 min",
      participants: 3,
    },
    {
      title: "AI Lecture - Neural Networks",
      date: "2 days ago",
      duration: "60 min",
      participants: 1,
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 sm:pt-32 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="mb-12 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-4">
              Your <span className="text-gradient">Digital Vault</span>
            </h1>
            <p className="text-lg text-foreground/70">
              Manage and explore your conversation insights
            </p>
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
            <div className="space-y-4">
              {recentConversations.map((conv, index) => (
                <div
                  key={index}
                  className="bg-card/50 rounded-xl p-6 hover:bg-card/80 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                        {conv.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-foreground/60">
                        <span>{conv.date}</span>
                        <span>•</span>
                        <span>{conv.duration}</span>
                        <span>•</span>
                        <span>{conv.participants} participants</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      View →
                    </Button>
                  </div>
                </div>
              ))}
            </div>
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
