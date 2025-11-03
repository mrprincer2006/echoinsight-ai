import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Zap, ArrowLeft, Activity, TrendingUp, MessageSquare, Smile } from "lucide-react";

const RealtimeInsights = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Home
          </Button>

          <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-accent to-secondary rounded-2xl mb-6 glow-accent">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
              Real-time <span className="text-gradient-accent">Insights</span>
            </h1>
            <p className="text-xl text-foreground/70 mb-8">
              Live transcription and instant personality analysis during conversations
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="bg-gradient-to-r from-accent to-secondary hover:scale-105 transition-all duration-300 glow-accent"
            >
              <Zap className="w-5 h-5 mr-2" />
              Try Live Analysis
            </Button>
          </div>

          {/* Live Features */}
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
            <div className="glass-morphism rounded-2xl p-8 hover-lift">
              <div className="w-14 h-14 bg-gradient-to-br from-accent to-secondary rounded-xl flex items-center justify-center mb-6 glow-accent">
                <Activity className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Live Transcription</h3>
              <p className="text-foreground/70 mb-6">
                See what's being said in real-time as you record
              </p>
              <div className="bg-background/50 rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-accent">LIVE</span>
                </div>
                <p className="text-sm text-foreground/80 italic">
                  "So the next step in our project is to finalize the design mockups..."
                </p>
              </div>
            </div>

            <div className="glass-morphism rounded-2xl p-8 hover-lift">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-6 glow">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Conversation Flow</h3>
              <p className="text-foreground/70 mb-6">
                Track speaking patterns and engagement in real-time
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-primary/20 rounded-full h-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-primary to-primary-glow h-full rounded-full w-3/4" />
                  </div>
                  <span className="text-sm">You 75%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-accent/20 rounded-full h-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-accent to-secondary h-full rounded-full w-1/4" />
                  </div>
                  <span className="text-sm">Others 25%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Instant Analysis */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold font-heading text-center mb-12">
              Instant <span className="text-gradient">Analysis</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="glass-morphism rounded-2xl p-6 hover-lift">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-secondary to-orange rounded-lg flex items-center justify-center">
                    <Smile className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Sentiment Tracking</h3>
                </div>
                <p className="text-foreground/70 mb-4">
                  Monitor emotional tone throughout the conversation
                </p>
                <div className="flex gap-2">
                  <div className="flex-1 text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <p className="text-2xl font-bold text-green-400">87%</p>
                    <p className="text-xs text-foreground/70">Positive</p>
                  </div>
                  <div className="flex-1 text-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                    <p className="text-2xl font-bold text-yellow-400">10%</p>
                    <p className="text-xs text-foreground/70">Neutral</p>
                  </div>
                  <div className="flex-1 text-center p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                    <p className="text-2xl font-bold text-red-400">3%</p>
                    <p className="text-xs text-foreground/70">Negative</p>
                  </div>
                </div>
              </div>

              <div className="glass-morphism rounded-2xl p-6 hover-lift">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Key Topics</h3>
                </div>
                <p className="text-foreground/70 mb-4">
                  Automatically detect main discussion topics
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                    Project Timeline
                  </span>
                  <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
                    Budget
                  </span>
                  <span className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm">
                    Team Tasks
                  </span>
                  <span className="px-3 py-1 bg-orange/20 text-orange rounded-full text-sm">
                    Deadlines
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold font-heading text-center mb-12">
              Why Use <span className="text-gradient">Real-time Insights</span>
            </h2>
            <div className="space-y-6">
              <div className="glass-morphism rounded-2xl p-6 hover-lift">
                <h3 className="text-xl font-bold mb-2">Stay Focused on Conversation</h3>
                <p className="text-foreground/70">
                  No need to take notes manually - the AI captures everything while you focus on the discussion
                </p>
              </div>

              <div className="glass-morphism rounded-2xl p-6 hover-lift">
                <h3 className="text-xl font-bold mb-2">Immediate Feedback</h3>
                <p className="text-foreground/70">
                  Get instant insights about conversation dynamics, speaking time, and engagement levels
                </p>
              </div>

              <div className="glass-morphism rounded-2xl p-6 hover-lift">
                <h3 className="text-xl font-bold mb-2">Better Decision Making</h3>
                <p className="text-foreground/70">
                  Use real-time sentiment and topic tracking to adjust your approach during the conversation
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RealtimeInsights;
