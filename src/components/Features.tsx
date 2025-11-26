import { useNavigate } from "react-router-dom";
import { Mic, Brain, Lock, Search, FileText, Zap, Users, Globe, BarChart3, Tag, Share2, Bell } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const Features = () => {
  const navigate = useNavigate();
  const features = [
    {
      icon: Mic,
      title: "Smart Recording",
      description: "Browser-based audio recording with real-time waveform visualization and speaker detection",
      color: "from-primary to-primary-glow",
      path: "/smart-recording",
    },
    {
      icon: Brain,
      title: "AI Summarization",
      description: "Get 5 key points, action items, and personality insights from every conversation",
      color: "from-accent to-primary",
      path: "/ai-summarization",
    },
    {
      icon: Lock,
      title: "Secure Vault",
      description: "AES-256 encrypted storage with 30-day free retention and premium unlimited storage",
      color: "from-secondary to-orange",
      path: "/secure-vault",
    },
    {
      icon: Search,
      title: "Semantic Search",
      description: "Find conversations by topic, person, or context using advanced AI-powered search",
      color: "from-orange to-accent",
      path: "/semantic-search",
    },
    {
      icon: FileText,
      title: "Study Tools",
      description: "Auto-generate flashcards and revision notes from classroom lectures",
      color: "from-primary to-secondary",
      path: "/study-tools",
    },
    {
      icon: Zap,
      title: "Real-time Insights",
      description: "Live transcription and instant personality analysis during conversations",
      color: "from-accent to-secondary",
      path: "/realtime-insights",
    },
    {
      icon: Tag,
      title: "Smart Tagging",
      description: "AI automatically categorizes and tags conversations by topic, sentiment, and priority",
      color: "from-primary-glow to-accent",
      path: "/dashboard",
    },
    {
      icon: Globe,
      title: "Multi-Language",
      description: "Support for 50+ languages with automatic translation and cross-language search",
      color: "from-secondary to-primary",
      path: "/dashboard",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share insights, collaborate on notes, and manage team conversations seamlessly",
      color: "from-accent to-orange",
      path: "/dashboard",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track conversation trends, speaking patterns, and engagement metrics over time",
      color: "from-orange to-primary-glow",
      path: "/dashboard",
    },
    {
      icon: Share2,
      title: "Smart Export",
      description: "Export to PDF, Word, Notion, or share secure links with customizable permissions",
      color: "from-primary to-accent",
      path: "/dashboard",
    },
    {
      icon: Bell,
      title: "AI Reminders",
      description: "Get intelligent follow-up alerts for action items and important conversation points",
      color: "from-secondary to-primary-glow",
      path: "/dashboard",
    },
  ];

  return (
    <section className="py-16 sm:py-24 lg:py-32 relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading mb-4 sm:mb-6">
              Powerful <span className="text-gradient">Features</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-foreground/70">
              Everything you need to transform conversations into actionable intelligence
            </p>
          </div>
        </ScrollReveal>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 0.1} threshold={0.2}>
              <div
              onClick={() => navigate(feature.path)}
              className="glass-morphism rounded-3xl p-6 sm:p-8 hover-lift cursor-pointer group relative overflow-hidden"
            >
              {/* Hover gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Icon */}
              <div className="relative mb-6">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl blur-2xl opacity-50 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110`} />
                <div className={`relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform duration-500`}>
                  <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>

              {/* Content */}
              <h3 className="relative text-xl sm:text-2xl font-bold font-heading mb-3 group-hover:text-gradient transition-all duration-300">
                {feature.title}
              </h3>
              <p className="relative text-sm sm:text-base text-foreground/70 leading-relaxed group-hover:text-foreground/90 transition-colors duration-300">
                {feature.description}
              </p>
              
              {/* Click indicator */}
              <div className="relative mt-4 text-sm text-primary/70 group-hover:text-primary transition-colors duration-300 flex items-center gap-1">
                <span>Learn more</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
