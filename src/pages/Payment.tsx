import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Check, Copy, Upload, Smartphone, Building2, QrCode, Loader2, Sparkles } from "lucide-react";

const Payment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("upi");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  // Get plan details from URL params
  const planName = searchParams.get("plan") || "Premium Vault";
  const planPrice = parseFloat(searchParams.get("price") || "19");
  const currency = searchParams.get("currency") || "USD";
  
  // Convert USD to INR (approximate rate: 1 USD = 83 INR)
  const [amountInr, setAmountInr] = useState(planPrice * 83);
  
  useEffect(() => {
    setAmountInr(planPrice * 83);
  }, [planPrice]);

  // UPI Details
  const upiId = "srsvault@upi";
  const upiQrCode = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=${upiId}&pn=SRS%20Vault%20AI&am=${amountInr.toFixed(2)}&cu=INR`;

  // Bank Details
  const bankDetails = {
    accountHolder: "SRS Vault AI",
    bankName: "State Bank of India",
    accountNumber: "1234567890123456",
    ifscCode: "SBIN0001234",
    branch: "Mumbai Central",
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast({
      title: "Copied!",
      description: `${field} copied to clipboard`,
    });
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleUpiSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      payment_method: "upi",
      transaction_id: formData.get("transactionId") as string,
      user_name: formData.get("name") as string,
      user_email: formData.get("email") as string,
      amount: parseFloat(formData.get("amount") as string),
      upi_id: upiId,
      notes: formData.get("notes") as string,
    };

    const { error } = await supabase.from("payments").insert([data]);

    setIsSubmitting(false);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to submit payment. Please try again.",
        variant: "destructive",
      });
    } else {
      setShowSuccess(true);
    }
  };

  const handleBankSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      payment_method: "bank_transfer",
      transaction_id: formData.get("referenceNumber") as string,
      user_name: formData.get("name") as string,
      user_email: formData.get("email") as string,
      amount: parseFloat(formData.get("amount") as string),
      notes: formData.get("notes") as string,
    };

    const { error } = await supabase.from("payments").insert([data]);

    setIsSubmitting(false);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to submit payment. Please try again.",
        variant: "destructive",
      });
    } else {
      setShowSuccess(true);
    }
  };

  const copyAllBankDetails = () => {
    const details = `Account Holder: ${bankDetails.accountHolder}
Bank: ${bankDetails.bankName}
Account Number: ${bankDetails.accountNumber}
IFSC Code: ${bankDetails.ifscCode}
Branch: ${bankDetails.branch}`;
    
    navigator.clipboard.writeText(details);
    toast({
      title: "Copied!",
      description: "All bank details copied to clipboard",
    });
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <Card className="w-full max-w-md mx-4 glass-morphism border-primary/20 animate-scale-in">
          <CardHeader className="text-center pb-3">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center mb-4 animate-glow-pulse">
              <Check className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-gradient">Payment Received!</CardTitle>
            <CardDescription className="text-base mt-2">
              Welcome to SRS Vault AI Premium
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-muted-foreground">
              Your payment is being verified. You'll receive a confirmation email shortly.
            </p>
            <Button 
              onClick={() => navigate("/dashboard")} 
              className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              size="lg"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              Secure Payment Gateway
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Pay securely with UPI or bank transfer — fast, simple, and verified.
            </p>
          </div>

          {/* Plan Details Card */}
          <Card className="glass-morphism border-primary/20 mb-8 animate-fade-in">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gradient mb-2">{planName}</h2>
                  <p className="text-muted-foreground">Monthly recurring subscription</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gradient mb-1">
                    ${planPrice} USD
                  </div>
                  <div className="text-lg text-accent">
                    ≈ ₹{amountInr.toFixed(0)} INR
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/services")}
                className="mt-4"
              >
                ← Back to Plans
              </Button>
            </CardContent>
          </Card>

          {/* Payment Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-fade-in">
            <TabsList className="grid w-full grid-cols-2 mb-8 glass h-14">
              <TabsTrigger value="upi" className="text-base">
                <Smartphone className="w-5 h-5 mr-2" />
                Pay via UPI
              </TabsTrigger>
              <TabsTrigger value="bank" className="text-base">
                <Building2 className="w-5 h-5 mr-2" />
                Bank Transfer
              </TabsTrigger>
            </TabsList>

            {/* UPI Payment */}
            <TabsContent value="upi" className="animate-fade-in">
              <div className="grid md:grid-cols-2 gap-6">
                {/* QR Code Card */}
                <Card className="glass-morphism border-primary/20 hover-lift">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <QrCode className="w-5 h-5 text-primary" />
                      Scan QR Code
                    </CardTitle>
                    <CardDescription>
                      Use any UPI app to scan and pay
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-white p-4 rounded-lg mx-auto w-fit glow">
                      <img 
                        src={upiQrCode} 
                        alt="UPI QR Code" 
                        className="w-64 h-64 mx-auto"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>UPI ID</Label>
                      <div className="flex gap-2">
                        <Input value={upiId} readOnly className="font-mono" />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => copyToClipboard(upiId, "UPI ID")}
                          className="shrink-0"
                        >
                          {copiedField === "UPI ID" ? (
                            <Check className="w-4 h-4 text-accent" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Details Form */}
                <Card className="glass-morphism border-primary/20">
                  <CardHeader>
                    <CardTitle>Payment Details</CardTitle>
                    <CardDescription>
                      Enter your payment information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpiSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="upi-name">Full Name *</Label>
                        <Input 
                          id="upi-name" 
                          name="name" 
                          placeholder="Your name" 
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="upi-email">Email *</Label>
                        <Input 
                          id="upi-email" 
                          name="email" 
                          type="email" 
                          placeholder="your@email.com" 
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="upi-amount">Amount (₹) *</Label>
                        <Input 
                          id="upi-amount" 
                          name="amount" 
                          type="number" 
                          step="0.01"
                          value={amountInr.toFixed(2)}
                          readOnly
                          className="bg-muted/50"
                        />
                        <p className="text-xs text-muted-foreground">
                          ${planPrice} USD ≈ ₹{amountInr.toFixed(0)} INR
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="upi-transaction">Transaction ID *</Label>
                        <Input 
                          id="upi-transaction" 
                          name="transactionId" 
                          placeholder="Enter UPI transaction ID" 
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="upi-notes">Notes (Optional)</Label>
                        <Textarea 
                          id="upi-notes" 
                          name="notes" 
                          placeholder="Any additional information" 
                          rows={3}
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                        size="lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4 mr-2" />
                            Submit Payment
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Bank Transfer */}
            <TabsContent value="bank" className="animate-fade-in">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Bank Details Card */}
                <Card className="glass-morphism border-primary/20 hover-lift">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-primary" />
                      Bank Account Details
                    </CardTitle>
                    <CardDescription>
                      Transfer to the following account
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="text-sm text-muted-foreground">Account Holder</p>
                          <p className="font-semibold">{bankDetails.accountHolder}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="text-sm text-muted-foreground">Bank Name</p>
                          <p className="font-semibold">{bankDetails.bankName}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">Account Number</p>
                          <p className="font-semibold font-mono">{bankDetails.accountNumber}</p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(bankDetails.accountNumber, "Account Number")}
                        >
                          {copiedField === "Account Number" ? (
                            <Check className="w-4 h-4 text-accent" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">IFSC Code</p>
                          <p className="font-semibold font-mono">{bankDetails.ifscCode}</p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(bankDetails.ifscCode, "IFSC Code")}
                        >
                          {copiedField === "IFSC Code" ? (
                            <Check className="w-4 h-4 text-accent" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="text-sm text-muted-foreground">Branch</p>
                          <p className="font-semibold">{bankDetails.branch}</p>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={copyAllBankDetails}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy All Details
                    </Button>
                  </CardContent>
                </Card>

                {/* Payment Confirmation Form */}
                <Card className="glass-morphism border-primary/20">
                  <CardHeader>
                    <CardTitle>Confirm Transfer</CardTitle>
                    <CardDescription>
                      Submit your payment details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleBankSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="bank-name">Full Name *</Label>
                        <Input 
                          id="bank-name" 
                          name="name" 
                          placeholder="Your name" 
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bank-email">Email *</Label>
                        <Input 
                          id="bank-email" 
                          name="email" 
                          type="email" 
                          placeholder="your@email.com" 
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bank-amount">Amount Transferred (₹) *</Label>
                        <Input 
                          id="bank-amount" 
                          name="amount" 
                          type="number" 
                          step="0.01"
                          value={amountInr.toFixed(2)}
                          readOnly
                          className="bg-muted/50"
                        />
                        <p className="text-xs text-muted-foreground">
                          ${planPrice} USD ≈ ₹{amountInr.toFixed(0)} INR
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bank-reference">Reference/UTR Number *</Label>
                        <Input 
                          id="bank-reference" 
                          name="referenceNumber" 
                          placeholder="Enter bank reference number" 
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bank-notes">Notes (Optional)</Label>
                        <Textarea 
                          id="bank-notes" 
                          name="notes" 
                          placeholder="Any additional information" 
                          rows={3}
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                        size="lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4 mr-2" />
                            Submit Payment
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Trust Badges */}
          <div className="mt-12 text-center space-y-4 animate-fade-in">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Check className="w-5 h-5 text-accent" />
              <span>Secure SSL encrypted payment</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <span>✓ Fast verification</span>
              <span>✓ 24/7 support</span>
              <span>✓ Money-back guarantee</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Payment;
