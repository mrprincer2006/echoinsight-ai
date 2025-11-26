import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Founder from "@/components/Founder";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import InteractiveParticles from "@/components/InteractiveParticles";
import FloatingShapes from "@/components/FloatingShapes";

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <InteractiveParticles />
      <FloatingShapes />
      <Navigation />
      <Hero />
      <Features />
      <Founder />
      <Footer />
    </div>
  );
};

export default Index;
