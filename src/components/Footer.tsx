import { Link } from "react-router-dom";
import { Mail, MessageSquare } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-card/20 backdrop-blur-xl">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold font-heading text-gradient">
              SRS Vault AI
            </h3>
            <p className="text-sm text-foreground/70">
              Transform conversations into intelligence with AI-powered insights.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-foreground/70 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-foreground/70 hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-foreground/70 hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-foreground/70 hover:text-primary transition-colors">
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
                <Link to="/terms" className="text-foreground/70 hover:text-primary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-foreground/70 hover:text-primary transition-colors">
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
                  className="flex items-center gap-2 text-foreground/70 hover:text-accent transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Send Message
                </Link>
              </li>
              <li>
                <button className="flex items-center gap-2 text-foreground/70 hover:text-accent transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  Live Chat
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-sm text-foreground/60">
            © {currentYear} SRS Vault AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
