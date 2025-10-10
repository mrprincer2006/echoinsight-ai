import founderImage from "@/assets/founder.jpg";

const Founder = () => {
  return (
    <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading mb-4">
              Meet the <span className="text-gradient">Founder</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          </div>

          {/* Founder Content */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image */}
            <div className="order-1 md:order-1 animate-fade-in-up">
              <div className="relative group max-w-md mx-auto md:max-w-none">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />
                <div className="relative glass rounded-2xl p-2 overflow-hidden">
                  <img
                    src={founderImage}
                    alt="Prince Raj - Founder of SRS Vault AI"
                    className="w-full h-auto rounded-xl object-cover aspect-square"
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="order-2 md:order-2 space-y-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading mb-2">
                  Prince Raj
                </h3>
                <p className="text-accent text-lg sm:text-xl font-medium">
                  Founder & CEO, SRS Vault AI
                </p>
              </div>

              <div className="space-y-4 text-foreground/80 text-base sm:text-lg leading-relaxed">
                <p>
                  I'm <span className="text-primary font-semibold">Prince Raj</span>, founder of SRS Vault AI.
                  Passionate about AI and technology, I create intelligent solutions that simplify
                  complex problems and make innovation accessible to everyone.
                </p>

                <p>
                  Our mission is to revolutionize how people interact with their conversations,
                  turning every discussion into actionable insights and meaningful knowledge.
                </p>
              </div>

              {/* Mission & Vision Cards */}
              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                <div className="glass rounded-xl p-4 sm:p-6 hover:scale-105 transition-transform">
                  <div className="text-accent font-bold text-sm mb-2">MISSION</div>
                  <p className="text-sm text-foreground/70">
                    Empower individuals with AI-driven conversation intelligence
                  </p>
                </div>
                <div className="glass rounded-xl p-4 sm:p-6 hover:scale-105 transition-transform">
                  <div className="text-secondary font-bold text-sm mb-2">VISION</div>
                  <p className="text-sm text-foreground/70">
                    Make every conversation a source of knowledge and growth
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founder;
