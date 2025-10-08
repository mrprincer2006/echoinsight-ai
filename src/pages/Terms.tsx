import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 sm:pt-32 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-4">
                Terms & <span className="text-gradient">Conditions</span>
              </h1>
              <p className="text-foreground/70">Last updated: January 2025</p>
            </div>

            <div className="glass rounded-2xl p-8 sm:p-12 space-y-8 animate-fade-in-up">
              <section className="space-y-4">
                <h2 className="text-2xl font-bold font-heading text-accent">1. Acceptance of Terms</h2>
                <p className="text-foreground/80 leading-relaxed">
                  By accessing and using SRS Vault AI, you accept and agree to be bound by the terms and
                  provision of this agreement. If you do not agree to these terms, please do not use our service.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold font-heading text-secondary">2. Use of Service</h2>
                <p className="text-foreground/80 leading-relaxed">
                  You agree to use our service only for lawful purposes and in accordance with these Terms.
                  You must obtain proper consent before recording any conversation involving other parties.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold font-heading text-primary">3. Data Storage</h2>
                <p className="text-foreground/80 leading-relaxed">
                  Free tier users receive 30 days of data storage. After 30 days, data will be automatically
                  deleted unless you upgrade to a premium subscription. Premium users have unlimited storage
                  duration.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold font-heading text-orange">4. Privacy & Security</h2>
                <p className="text-foreground/80 leading-relaxed">
                  We use AES-256 encryption to protect your data. All recordings and transcripts are stored
                  securely and are accessible only to you. We do not share your data with third parties
                  without your explicit consent.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold font-heading text-accent">5. Subscription & Payments</h2>
                <p className="text-foreground/80 leading-relaxed">
                  Premium subscriptions are billed monthly or annually. You can cancel your subscription
                  at any time. Refunds are provided on a case-by-case basis within 14 days of purchase.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold font-heading text-secondary">6. Limitation of Liability</h2>
                <p className="text-foreground/80 leading-relaxed">
                  SRS Vault AI is provided "as is" without warranty of any kind. We are not liable for
                  any damages arising from the use or inability to use our service.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold font-heading text-primary">7. Contact</h2>
                <p className="text-foreground/80 leading-relaxed">
                  For questions about these Terms & Conditions, please contact us at{" "}
                  <a href="mailto:rajwtf213@gmail.com" className="text-primary hover:underline">
                    rajwtf213@gmail.com
                  </a>
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

export default Terms;
