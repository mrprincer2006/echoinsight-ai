import { Button } from "./ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import GradientBlinds from "./GradientBlinds";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Gradient Blinds Background */}
      <div className="absolute inset-0 -z-10" style={{ height: '600px' }}>
        <GradientBlinds
          className=""
          gradientColors={['#FF9FFC', '#5227FF']}
          angle={0}
          noise={0.3}
          blindCount={12}
          blindMinWidth={50}
          spotlightRadius={0.5}
          spotlightSoftness={1}
          spotlightOpacity={1}
          mouseDampening={0.15}
          distortAmount={0}
          shineDirection="left"
          mixBlendMode="lighten"
        />
      </div>
      
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.15),transparent_50%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }} />
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full animate-fade-in">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-foreground/90">
              AI-Powered Conversation Intelligence
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-heading leading-tight animate-fade-in-up">
            Your Conversations,
            <br />
            <span className="text-gradient">Your Vault, Your Insights</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl lg:text-2xl text-foreground/70 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Record, transcribe, and transform conversations into actionable insights.
            AI-powered summaries, personality analysis, and smart revision tools.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <Button
              size="lg"
              onClick={() => navigate("/auth")}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300 glow group text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14"
            >
              Start Recording Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/services")}
              className="border-primary/50 hover:bg-primary/10 text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14"
            >
              Explore Features
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 pt-12 sm:pt-16 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: "0.6s" }}>
            {[
              { value: "10K+", label: "Active Users" },
              { value: "500K+", label: "Conversations" },
              { value: "98%", label: "Accuracy" },
              { value: "30s", label: "Avg Summary Time" },
            ].map((stat, index) => (
              <div key={index} className="glass rounded-xl p-4 sm:p-6 hover:scale-105 transition-transform">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient-accent">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-foreground/60 mt-1 sm:mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
