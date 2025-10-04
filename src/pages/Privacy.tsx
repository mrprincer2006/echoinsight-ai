import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 sm:pt-32 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-4">
                Privacy <span className="text-gradient">Policy</span>
              </h1>
              <p className="text-foreground/70">Last updated: January 2025</p>
            </div>

            <div className="glass rounded-2xl p-8 sm:p-12 space-y-8 animate-fade-in-up">
              <section className="space-y-4">
                <h2 className="text-2xl font-bold font-heading text-accent">Information We Collect</h2>
                <p className="text-foreground/80 leading-relaxed">
                  We collect information you provide directly to us, including your name, email address,
                  and any audio recordings you choose to upload or create using our service.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold font-heading text-secondary">How We Use Your Information</h2>
                <p className="text-foreground/80 leading-relaxed">
                  We use the information we collect to provide, maintain, and improve our services, including
                  transcription, AI summarization, and personality insights. We also use your information to
                  communicate with you about your account and our services.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold font-heading text-primary">Data Security</h2>
                <p className="text-foreground/80 leading-relaxed">
                  We implement industry-standard security measures including AES-256 encryption for data at rest
                  and HTTPS for data in transit. All recordings and transcripts are stored on secure servers
                  with restricted access.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold font-heading text-orange">Data Sharing</h2>
                <p className="text-foreground/80 leading-relaxed">
                  We do not sell, trade, or rent your personal information to third parties. We may share
                  aggregated, anonymized data for analytics purposes, but this data cannot be used to identify
                  individual users.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold font-heading text-accent">Your Rights</h2>
                <p className="text-foreground/80 leading-relaxed">
                  You have the right to access, update, or delete your personal information at any time.
                  You can also request a copy of all data we have stored about you. Contact us at
                  privacy@srsvault.ai to exercise these rights.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold font-heading text-secondary">GDPR Compliance</h2>
                <p className="text-foreground/80 leading-relaxed">
                  We are committed to GDPR compliance. All data processing is done with your explicit consent,
                  and you have full control over your data including the right to be forgotten.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold font-heading text-primary">Contact Us</h2>
                <p className="text-foreground/80 leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at privacy@srsvault.ai
                  or through our contact page.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
