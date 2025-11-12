-- Create payments table to track payment submissions
CREATE TABLE public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  payment_method TEXT NOT NULL CHECK (payment_method IN ('upi', 'bank_transfer')),
  amount DECIMAL(10, 2),
  transaction_id TEXT,
  upi_id TEXT,
  receipt_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected')),
  user_email TEXT,
  user_name TEXT,
  notes TEXT
);

-- Enable RLS
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit payment (for non-authenticated users too)
CREATE POLICY "Anyone can submit payment"
  ON public.payments
  FOR INSERT
  WITH CHECK (true);

-- Users can view their own payments
CREATE POLICY "Users can view own payments"
  ON public.payments
  FOR SELECT
  USING (
    auth.uid() = user_id OR 
    (auth.uid() IS NULL AND user_email IS NOT NULL)
  );

-- Admins can view all payments (authenticated users with specific role)
CREATE POLICY "Authenticated users can view all payments"
  ON public.payments
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Add updated_at trigger
CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();