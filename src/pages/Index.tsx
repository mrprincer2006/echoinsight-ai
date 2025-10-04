import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Founder from "@/components/Founder";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Features />
      <Founder />
      <Footer />
    </div>
  );
};

export default Index;
