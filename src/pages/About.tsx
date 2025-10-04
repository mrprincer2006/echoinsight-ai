import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 sm:pt-32 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Header */}
            <div className="text-center space-y-6 animate-fade-in">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading">
                About <span className="text-gradient">SRS Vault AI</span>
              </h1>
              <p className="text-lg sm:text-xl text-foreground/70">
                Revolutionizing conversation intelligence with AI-powered insights
              </p>
            </div>

            {/* Content */}
            <div className="glass rounded-2xl p-8 sm:p-12 space-y-8 animate-fade-in-up">
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-accent">
                  Our Story
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  SRS Vault AI was founded with a simple yet powerful vision: to transform every conversation
                  into actionable intelligence. We believe that the insights hidden in our daily discussions,
                  meetings, and lectures hold immense value that often goes untapped.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-secondary">
                  What We Do
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  Our AI-powered platform records, transcribes, and analyzes conversations to provide you with
                  comprehensive summaries, personality insights, and smart revision tools. Whether you're a student,
                  professional, or lifelong learner, SRS Vault AI helps you capture and retain knowledge from every
                  conversation.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-primary">
                  Our Technology
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  Built on cutting-edge AI and machine learning technologies, our platform uses advanced speech
                  recognition, natural language processing, and semantic analysis to deliver accurate transcriptions
                  and meaningful insights in seconds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
