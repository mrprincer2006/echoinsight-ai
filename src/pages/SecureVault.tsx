import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Lock, ArrowLeft, Shield, Database, Clock, Key } from "lucide-react";

const SecureVault = () => {
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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-secondary to-orange rounded-2xl mb-6">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
              Secure <span className="text-gradient">Vault</span>
            </h1>
            <p className="text-xl text-foreground/70 mb-8">
              AES-256 encrypted storage with 30-day free retention and premium unlimited storage
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="bg-gradient-to-r from-secondary to-orange hover:scale-105 transition-all duration-300"
            >
              <Lock className="w-5 h-5 mr-2" />
              Access Your Vault
            </Button>
          </div>

          {/* Security Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
            <div className="glass-morphism rounded-2xl p-6 hover-lift text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-secondary to-orange rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">AES-256 Encryption</h3>
              <p className="text-sm text-foreground/70">
                Military-grade encryption for all your recordings
              </p>
            </div>

            <div className="glass-morphism rounded-2xl p-6 hover-lift text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                <Database className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Secure Storage</h3>
              <p className="text-sm text-foreground/70">
                Redundant backups across multiple data centers
              </p>
            </div>

            <div className="glass-morphism rounded-2xl p-6 hover-lift text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">30-Day Free</h3>
              <p className="text-sm text-foreground/70">
                Keep recordings for 30 days at no cost
              </p>
            </div>

            <div className="glass-morphism rounded-2xl p-6 hover-lift text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-orange to-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                <Key className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Private Access</h3>
              <p className="text-sm text-foreground/70">
                Only you can access your encrypted data
              </p>
            </div>
          </div>

          {/* Storage Plans */}
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold font-heading text-center mb-12">
              Storage <span className="text-gradient">Plans</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Free Plan */}
              <div className="glass-morphism rounded-2xl p-8 hover-lift">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Free</h3>
                  <div className="text-4xl font-bold text-gradient mb-2">$0</div>
                  <p className="text-foreground/70">per month</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>30-day retention</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Up to 10 hours storage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>AES-256 encryption</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Basic support</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline">
                  Current Plan
                </Button>
              </div>

              {/* Premium Plan */}
              <div className="glass-morphism rounded-2xl p-8 hover-lift relative border-2 border-primary">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary px-4 py-1 rounded-full text-sm font-bold">
                  Popular
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Premium</h3>
                  <div className="text-4xl font-bold text-gradient mb-2">$9.99</div>
                  <p className="text-foreground/70">per month</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Unlimited retention</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Unlimited storage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Priority processing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>24/7 support</span>
                  </li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                  Upgrade Now
                </Button>
              </div>

              {/* Enterprise Plan */}
              <div className="glass-morphism rounded-2xl p-8 hover-lift">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                  <div className="text-4xl font-bold text-gradient mb-2">Custom</div>
                  <p className="text-foreground/70">contact us</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Custom retention</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Dedicated storage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>SSO & compliance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Dedicated support</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SecureVault;
