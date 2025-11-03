import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Brain, ArrowLeft, Sparkles, List, Target, Users } from "lucide-react";

const AISummarization = () => {
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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-2xl mb-6 glow-accent">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
              AI <span className="text-gradient-accent">Summarization</span>
            </h1>
            <p className="text-xl text-foreground/70 mb-8">
              Get 5 key points, action items, and personality insights from every conversation
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="bg-gradient-to-r from-accent to-primary hover:scale-105 transition-all duration-300 glow-accent"
            >
              <Brain className="w-5 h-5 mr-2" />
              View Your Summaries
            </Button>
          </div>

          {/* What You Get */}
          <div className="max-w-5xl mx-auto mb-16">
            <h2 className="text-3xl font-bold font-heading text-center mb-12">
              What You <span className="text-gradient">Get</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-morphism rounded-2xl p-8 hover-lift">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center mb-4 glow">
                  <List className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">5 Key Points</h3>
                <p className="text-foreground/70 mb-4">
                  AI extracts the most important information from your conversation
                </p>
                <ul className="space-y-2 text-foreground/80">
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span>Main topics discussed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span>Critical decisions made</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span>Important agreements</span>
                  </li>
                </ul>
              </div>

              <div className="glass-morphism rounded-2xl p-8 hover-lift">
                <div className="w-14 h-14 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center mb-4 glow-accent">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Action Items</h3>
                <p className="text-foreground/70 mb-4">
                  Never miss a follow-up with automatically extracted tasks
                </p>
                <ul className="space-y-2 text-foreground/80">
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                    <span>Tasks and assignments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                    <span>Deadlines mentioned</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                    <span>Follow-up requirements</span>
                  </li>
                </ul>
              </div>

              <div className="glass-morphism rounded-2xl p-8 hover-lift md:col-span-2">
                <div className="w-14 h-14 bg-gradient-to-br from-secondary to-orange rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Personality Insights</h3>
                <p className="text-foreground/70 mb-4">
                  Understand communication styles and emotional tones
                </p>
                <div className="grid sm:grid-cols-3 gap-4 mt-6">
                  <div className="bg-background/50 rounded-xl p-4 border border-white/10">
                    <p className="font-semibold text-secondary mb-1">Sentiment Analysis</p>
                    <p className="text-sm text-foreground/70">Overall emotional tone</p>
                  </div>
                  <div className="bg-background/50 rounded-xl p-4 border border-white/10">
                    <p className="font-semibold text-primary mb-1">Speaking Patterns</p>
                    <p className="text-sm text-foreground/70">Communication style</p>
                  </div>
                  <div className="bg-background/50 rounded-xl p-4 border border-white/10">
                    <p className="font-semibold text-accent mb-1">Engagement Level</p>
                    <p className="text-sm text-foreground/70">Participation metrics</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Example Summary */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold font-heading text-center mb-12">
              Example <span className="text-gradient">Summary</span>
            </h2>
            <div className="glass-morphism rounded-2xl p-8 space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <List className="w-5 h-5 text-primary" />
                  Key Points
                </h3>
                <ul className="space-y-2 text-foreground/80 ml-7">
                  <li>• Discussed Q4 marketing strategy and budget allocation</li>
                  <li>• Decided to focus on social media campaigns</li>
                  <li>• Reviewed competitor analysis findings</li>
                  <li>• Set revenue targets for next quarter</li>
                  <li>• Agreed on weekly progress meetings</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-accent" />
                  Action Items
                </h3>
                <ul className="space-y-2 text-foreground/80 ml-7">
                  <li>• John to prepare campaign mockups by Friday</li>
                  <li>• Sarah to reach out to influencer partners</li>
                  <li>• Team to submit budget proposals by end of week</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-secondary" />
                  Insights
                </h3>
                <p className="text-foreground/80 ml-7">
                  Overall positive and collaborative tone. High engagement from all participants. 
                  Strategic focus on data-driven decision making.
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

export default AISummarization;
