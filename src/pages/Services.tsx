import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      description: "Perfect for trying out SRS Vault AI",
      features: [
        "30-day conversation storage",
        "Basic AI summarization",
        "5 conversations per month",
        "Standard transcription",
        "Email support",
      ],
      gradient: "from-muted to-card",
      cta: "Get Started",
    },
    {
      name: "Premium Vault",
      price: "$19",
      period: "/month",
      description: "For power users and professionals",
      features: [
        "Unlimited conversation storage",
        "Advanced AI insights",
        "Unlimited conversations",
        "Speaker diarization",
        "Personality analysis",
        "Flashcard generation",
        "Semantic search",
        "Priority support",
      ],
      gradient: "from-primary to-secondary",
      cta: "Upgrade Now",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For teams and organizations",
      features: [
        "Everything in Premium",
        "Team collaboration",
        "Custom AI models",
        "API access",
        "Dedicated support",
        "Custom integrations",
        "SLA guarantee",
      ],
      gradient: "from-accent to-primary",
      cta: "Contact Sales",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 sm:pt-32 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading mb-6">
              Choose Your <span className="text-gradient">Plan</span>
            </h1>
            <p className="text-lg sm:text-xl text-foreground/70">
              Unlock the full potential of your conversations with our flexible pricing
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative glass rounded-2xl p-8 hover:scale-105 transition-all duration-300 animate-fade-in-up ${
                  plan.popular ? "ring-2 ring-primary glow" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold font-heading mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className="text-4xl font-bold text-gradient">{plan.price}</span>
                    <span className="text-foreground/60">{plan.period}</span>
                  </div>
                  <p className="text-sm text-foreground/70">{plan.description}</p>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                      : "bg-card hover:bg-muted"
                  }`}
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
