import { Mic, Brain, Lock, Search, FileText, Zap } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Mic,
      title: "Smart Recording",
      description: "Browser-based audio recording with real-time waveform visualization and speaker detection",
      color: "from-primary to-primary-glow",
    },
    {
      icon: Brain,
      title: "AI Summarization",
      description: "Get 5 key points, action items, and personality insights from every conversation",
      color: "from-accent to-primary",
    },
    {
      icon: Lock,
      title: "Secure Vault",
      description: "AES-256 encrypted storage with 30-day free retention and premium unlimited storage",
      color: "from-secondary to-orange",
    },
    {
      icon: Search,
      title: "Semantic Search",
      description: "Find conversations by topic, person, or context using advanced AI-powered search",
      color: "from-orange to-accent",
    },
    {
      icon: FileText,
      title: "Study Tools",
      description: "Auto-generate flashcards and revision notes from classroom lectures",
      color: "from-primary to-secondary",
    },
    {
      icon: Zap,
      title: "Real-time Insights",
      description: "Live transcription and instant personality analysis during conversations",
      color: "from-accent to-secondary",
    },
  ];

  return (
    <section className="py-16 sm:py-24 lg:py-32 relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading mb-4 sm:mb-6">
            Powerful <span className="text-gradient">Features</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-foreground/70">
            Everything you need to transform conversations into actionable intelligence
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-6 sm:p-8 hover:scale-105 transition-all duration-300 group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="relative mb-6">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`} />
                <div className={`relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center`}>
                  <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl sm:text-2xl font-bold font-heading mb-3">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
