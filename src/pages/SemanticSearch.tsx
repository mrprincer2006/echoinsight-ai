import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowLeft, Sparkles, Filter, Calendar, Tag } from "lucide-react";

const SemanticSearch = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const exampleSearches = [
    "discussions about project deadlines",
    "conversations with positive sentiment",
    "meetings where Sarah mentioned budget",
    "any talk about client feedback",
  ];

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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange to-accent rounded-2xl mb-6">
              <Search className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
              Semantic <span className="text-gradient">Search</span>
            </h1>
            <p className="text-xl text-foreground/70 mb-8">
              Find conversations by topic, person, or context using advanced AI-powered search
            </p>
          </div>

          {/* Search Interface */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="glass-morphism rounded-2xl p-8">
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
                <Input
                  type="text"
                  placeholder="Search by meaning, not just keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg bg-background/50 border-white/20"
                />
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <p className="text-sm text-foreground/70 w-full mb-2">Try these examples:</p>
                {exampleSearches.map((example, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchQuery(example)}
                    className="text-xs hover:bg-primary/20 hover:text-primary"
                  >
                    {example}
                  </Button>
                ))}
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-gradient-to-r from-orange to-accent">
                  <Search className="w-4 h-4 mr-2" />
                  Search Conversations
                </Button>
                <Button variant="outline">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-16">
            <div className="glass-morphism rounded-2xl p-6 hover-lift">
              <div className="w-12 h-12 bg-gradient-to-br from-orange to-accent rounded-xl flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Contextual Understanding</h3>
              <p className="text-foreground/70">
                Search understands meaning, not just exact word matches
              </p>
            </div>

            <div className="glass-morphism rounded-2xl p-6 hover-lift">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Time-based Filters</h3>
              <p className="text-foreground/70">
                Find conversations from specific dates or time periods
              </p>
            </div>

            <div className="glass-morphism rounded-2xl p-6 hover-lift">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center mb-4">
                <Tag className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Tagging</h3>
              <p className="text-foreground/70">
                Auto-generated tags help refine your search results
              </p>
            </div>
          </div>

          {/* How it Works */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold font-heading text-center mb-12">
              Search <span className="text-gradient">Capabilities</span>
            </h2>
            
            <div className="space-y-6">
              <div className="glass-morphism rounded-2xl p-6 hover-lift">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Natural Language Queries
                </h3>
                <p className="text-foreground/70 mb-3">
                  Ask questions in plain English:
                </p>
                <ul className="space-y-2 text-foreground/80 ml-7">
                  <li>• "Show me all meetings where we discussed pricing"</li>
                  <li>• "Find conversations with angry customers"</li>
                  <li>• "What did John say about the new feature?"</li>
                </ul>
              </div>

              <div className="glass-morphism rounded-2xl p-6 hover-lift">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Search className="w-5 h-5 text-accent" />
                  Semantic Matching
                </h3>
                <p className="text-foreground/70 mb-3">
                  Find similar concepts even with different words:
                </p>
                <ul className="space-y-2 text-foreground/80 ml-7">
                  <li>• Search "happy" finds "excited", "pleased", "satisfied"</li>
                  <li>• Search "problem" finds "issue", "challenge", "concern"</li>
                  <li>• Understands synonyms and related concepts</li>
                </ul>
              </div>

              <div className="glass-morphism rounded-2xl p-6 hover-lift">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Filter className="w-5 h-5 text-secondary" />
                  Advanced Filters
                </h3>
                <p className="text-foreground/70 mb-3">
                  Narrow down results with powerful filters:
                </p>
                <div className="grid sm:grid-cols-2 gap-3 ml-7">
                  <div className="text-foreground/80">• Date ranges</div>
                  <div className="text-foreground/80">• Participants</div>
                  <div className="text-foreground/80">• Duration</div>
                  <div className="text-foreground/80">• Sentiment</div>
                  <div className="text-foreground/80">• Tags</div>
                  <div className="text-foreground/80">• Topics</div>
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

export default SemanticSearch;
