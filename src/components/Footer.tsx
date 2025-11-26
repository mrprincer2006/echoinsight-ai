import { Link } from "react-router-dom";
import { Mail, MessageSquare } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-card/20 backdrop-blur-xl overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16 relative z-10">
        <ScrollReveal threshold={0.1}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="space-y-4 group">
            <h3 className="text-2xl font-bold font-heading text-gradient hover:scale-105 transition-transform duration-300 inline-block">
              SRS Vault AI
            </h3>
            <p className="text-sm text-foreground/70 group-hover:text-foreground/90 transition-colors duration-300">
              Transform conversations into intelligence with AI-powered insights.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-foreground/70 hover:text-primary transition-all duration-300 inline-block hover:translate-x-1">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-foreground/70 hover:text-primary transition-all duration-300 inline-block hover:translate-x-1">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-foreground/70 hover:text-primary transition-all duration-300 inline-block hover:translate-x-1">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-foreground/70 hover:text-primary transition-all duration-300 inline-block hover:translate-x-1">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4 text-foreground">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/terms" className="text-foreground/70 hover:text-primary transition-all duration-300 inline-block hover:translate-x-1">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-foreground/70 hover:text-primary transition-all duration-300 inline-block hover:translate-x-1">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-foreground">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link 
                  to="/contact" 
                  className="flex items-center gap-2 text-foreground/70 hover:text-accent transition-all duration-300 group"
                >
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Send Message</span>
                </Link>
              </li>
              <li>
                <button className="flex items-center gap-2 text-foreground/70 hover:text-accent transition-all duration-300 group">
                  <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Live Chat</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        </ScrollReveal>

        {/* Bottom Bar */}
        <ScrollReveal threshold={0.1} delay={0.2}>
          <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-sm text-foreground/60">
            © {currentYear} SRS Vault AI. All rights reserved.
          </p>
        </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};

export default Footer;
