import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Founder from "@/components/Founder";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import GradientBlinds from "@/components/GradientBlinds";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 🔮 Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <GradientBlinds
          gradientColors={["#FF9FFC", "#5227FF"]}
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

      {/* 🌐 Page Content */}
      <Navigation />
      <Hero />
      <Features />
      <Founder />
      <Footer />
    </div>
  );
};

export default Index;
