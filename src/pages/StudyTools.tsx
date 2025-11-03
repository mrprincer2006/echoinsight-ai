import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FileText, ArrowLeft, GraduationCap, BookOpen, Lightbulb, CheckCircle2 } from "lucide-react";

const StudyTools = () => {
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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl mb-6 glow">
              <FileText className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
              Study <span className="text-gradient">Tools</span>
            </h1>
            <p className="text-xl text-foreground/70 mb-8">
              Auto-generate flashcards and revision notes from classroom lectures
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-all duration-300 glow"
            >
              <GraduationCap className="w-5 h-5 mr-2" />
              Create Study Materials
            </Button>
          </div>

          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            <div className="glass-morphism rounded-2xl p-8 hover-lift">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-6 glow">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Auto-Generated Flashcards</h3>
              <p className="text-foreground/70 mb-6">
                AI creates smart flashcards from your lecture recordings automatically
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Key concepts extracted</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Question & answer format</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Spaced repetition scheduling</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Export to Anki, Quizlet</span>
                </li>
              </ul>
            </div>

            <div className="glass-morphism rounded-2xl p-8 hover-lift">
              <div className="w-14 h-14 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center mb-6 glow-accent">
                <Lightbulb className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Smart Revision Notes</h3>
              <p className="text-foreground/70 mb-6">
                Organized, formatted notes ready for your exam preparation
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span>Structured outlines</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span>Important points highlighted</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span>Example questions included</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span>PDF & Markdown export</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Example Flashcard */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold font-heading text-center mb-12">
              Example <span className="text-gradient">Flashcard</span>
            </h2>
            <div className="glass-morphism rounded-2xl overflow-hidden hover-lift">
              <div className="bg-gradient-to-r from-primary to-secondary p-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Biology 101 - Cell Structure
                </h3>
              </div>
              <div className="p-8">
                <div className="mb-6">
                  <p className="text-sm text-foreground/70 mb-2">QUESTION</p>
                  <p className="text-lg font-semibold">
                    What is the function of mitochondria in eukaryotic cells?
                  </p>
                </div>
                <div className="border-t border-white/10 pt-6">
                  <p className="text-sm text-foreground/70 mb-2">ANSWER</p>
                  <p className="text-foreground/90">
                    Mitochondria are the powerhouse of the cell, responsible for producing ATP 
                    (adenosine triphosphate) through cellular respiration. They convert nutrients 
                    into usable energy for the cell's activities.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold font-heading text-center mb-12">
              How It <span className="text-gradient">Works</span>
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4 glass-morphism rounded-2xl p-6 hover-lift">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Record Your Lecture</h3>
                  <p className="text-foreground/70">
                    Use our smart recording feature during your class or study session
                  </p>
                </div>
              </div>

              <div className="flex gap-4 glass-morphism rounded-2xl p-6 hover-lift">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">AI Processes Content</h3>
                  <p className="text-foreground/70">
                    Our AI analyzes the lecture and identifies key concepts, definitions, and important points
                  </p>
                </div>
              </div>

              <div className="flex gap-4 glass-morphism rounded-2xl p-6 hover-lift">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-secondary to-orange rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Review & Export</h3>
                  <p className="text-foreground/70">
                    Get instant flashcards and notes, review them in-app, or export to your favorite study platform
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StudyTools;
