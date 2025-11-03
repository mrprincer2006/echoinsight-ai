import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Mic, Square, Play, Pause, ArrowLeft } from "lucide-react";
import RecordingModal from "@/components/RecordingModal";

const SmartRecording = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Home
          </Button>

          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-primary-glow rounded-2xl mb-6 glow">
              <Mic className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
              Smart <span className="text-gradient">Recording</span>
            </h1>
            <p className="text-xl text-foreground/70 mb-8">
              Browser-based audio recording with real-time waveform visualization and speaker detection
            </p>
            <Button
              size="lg"
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-all duration-300 glow"
            >
              <Mic className="w-5 h-5 mr-2" />
              Start Recording
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="glass-morphism rounded-2xl p-6 hover-lift">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4">
                <Mic className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">High Quality Audio</h3>
              <p className="text-foreground/70">
                Record in crystal clear quality with automatic noise reduction
              </p>
            </div>

            <div className="glass-morphism rounded-2xl p-6 hover-lift">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-4">
                <Play className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Live Waveform</h3>
              <p className="text-foreground/70">
                Visualize your audio in real-time with dynamic waveforms
              </p>
            </div>

            <div className="glass-morphism rounded-2xl p-6 hover-lift">
              <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mb-4">
                <Pause className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Pause & Resume</h3>
              <p className="text-foreground/70">
                Full control with pause, resume, and restart capabilities
              </p>
            </div>

            <div className="glass-morphism rounded-2xl p-6 hover-lift">
              <div className="w-12 h-12 bg-orange/20 rounded-xl flex items-center justify-center mb-4">
                <Square className="w-6 h-6 text-orange" />
              </div>
              <h3 className="text-xl font-bold mb-2">Auto-Save</h3>
              <p className="text-foreground/70">
                Recordings automatically saved to your secure vault
              </p>
            </div>

            <div className="glass-morphism rounded-2xl p-6 hover-lift">
              <div className="w-12 h-12 bg-primary-glow/20 rounded-xl flex items-center justify-center mb-4">
                <Mic className="w-6 h-6 text-primary-glow" />
              </div>
              <h3 className="text-xl font-bold mb-2">Speaker Detection</h3>
              <p className="text-foreground/70">
                AI identifies different speakers in multi-person conversations
              </p>
            </div>

            <div className="glass-morphism rounded-2xl p-6 hover-lift">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-4">
                <Play className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Playback</h3>
              <p className="text-foreground/70">
                Review your recordings immediately after stopping
              </p>
            </div>
          </div>

          {/* How it Works */}
          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-3xl font-bold font-heading text-center mb-12">
              How It <span className="text-gradient">Works</span>
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4 glass-morphism rounded-2xl p-6 hover-lift">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Click Start Recording</h3>
                  <p className="text-foreground/70">
                    Grant microphone permissions when prompted by your browser
                  </p>
                </div>
              </div>

              <div className="flex gap-4 glass-morphism rounded-2xl p-6 hover-lift">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Record Your Conversation</h3>
                  <p className="text-foreground/70">
                    Watch the real-time waveform as you speak. Pause and resume as needed
                  </p>
                </div>
              </div>

              <div className="flex gap-4 glass-morphism rounded-2xl p-6 hover-lift">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-secondary to-orange rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Save & Process</h3>
                  <p className="text-foreground/70">
                    Your recording is automatically transcribed and analyzed by AI
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <RecordingModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
};

export default SmartRecording;
