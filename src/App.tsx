import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import SmartRecording from "./pages/SmartRecording";
import AISummarization from "./pages/AISummarization";
import SecureVault from "./pages/SecureVault";
import SemanticSearch from "./pages/SemanticSearch";
import StudyTools from "./pages/StudyTools";
import RealtimeInsights from "./pages/RealtimeInsights";
import Payment from "./pages/Payment";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/smart-recording" element={<SmartRecording />} />
          <Route path="/ai-summarization" element={<AISummarization />} />
          <Route path="/secure-vault" element={<SecureVault />} />
          <Route path="/semantic-search" element={<SemanticSearch />} />
          <Route path="/study-tools" element={<StudyTools />} />
          <Route path="/realtime-insights" element={<RealtimeInsights />} />
          <Route path="/payment" element={<Payment />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
