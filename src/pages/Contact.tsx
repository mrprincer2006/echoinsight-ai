import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, MessageSquare, Send } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 sm:pt-32 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading mb-6">
                Get in <span className="text-gradient">Touch</span>
              </h1>
              <p className="text-lg sm:text-xl text-foreground/70">
                Have questions? We'd love to hear from you.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div className="glass rounded-2xl p-8 animate-fade-in-up">
                <h2 className="text-2xl font-bold font-heading mb-6">Send us a message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      required
                      className="bg-background/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      required
                      className="bg-background/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us what you're thinking..."
                      rows={6}
                      required
                      className="bg-background/50 resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <div className="glass rounded-2xl p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Email Us</h3>
                      <p className="text-foreground/70 text-sm">
                        Send us an email and we'll respond within 24 hours
                      </p>
                      <a 
                        href="mailto:support@srsvault.ai" 
                        className="text-accent hover:text-accent/80 transition-colors text-sm mt-2 inline-block"
                      >
                        support@srsvault.ai
                      </a>
                    </div>
                  </div>
                </div>

                <div className="glass rounded-2xl p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-secondary to-orange rounded-xl flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Live Chat</h3>
                      <p className="text-foreground/70 text-sm">
                        Get instant help from our support team
                      </p>
                      <Button 
                        variant="link" 
                        className="text-secondary hover:text-secondary/80 p-0 h-auto mt-2"
                      >
                        Start a conversation →
                      </Button>
                    </div>
                  </div>
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

export default Contact;
