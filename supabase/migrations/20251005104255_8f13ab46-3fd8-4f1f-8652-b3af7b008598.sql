-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'premium', 'enterprise')),
  subscription_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create conversations table
CREATE TABLE public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  type TEXT DEFAULT 'discussion' CHECK (type IN ('discussion', 'lecture', 'meeting', 'group')),
  duration_seconds INTEGER,
  participant_count INTEGER DEFAULT 1,
  audio_url TEXT,
  status TEXT DEFAULT 'processing' CHECK (status IN ('recording', 'processing', 'completed', 'failed')),
  recorded_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ DEFAULT (now() + INTERVAL '30 days'),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own conversations"
  ON public.conversations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own conversations"
  ON public.conversations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own conversations"
  ON public.conversations FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own conversations"
  ON public.conversations FOR DELETE
  USING (auth.uid() = user_id);

-- Create transcripts table
CREATE TABLE public.transcripts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE NOT NULL,
  full_text TEXT NOT NULL,
  speaker_segments JSONB,
  language TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.transcripts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own transcripts"
  ON public.transcripts FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.conversations
      WHERE conversations.id = transcripts.conversation_id
      AND conversations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create transcripts for own conversations"
  ON public.transcripts FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.conversations
      WHERE conversations.id = conversation_id
      AND conversations.user_id = auth.uid()
    )
  );

-- Create summaries table
CREATE TABLE public.summaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE NOT NULL,
  key_points TEXT[] NOT NULL,
  action_items TEXT[],
  main_topics TEXT[],
  one_line_summary TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.summaries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own summaries"
  ON public.summaries FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.conversations
      WHERE conversations.id = summaries.conversation_id
      AND conversations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create summaries for own conversations"
  ON public.summaries FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.conversations
      WHERE conversations.id = conversation_id
      AND conversations.user_id = auth.uid()
    )
  );

-- Create personality_insights table
CREATE TABLE public.personality_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE NOT NULL,
  person_name TEXT NOT NULL,
  insights TEXT[] NOT NULL,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.personality_insights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own personality insights"
  ON public.personality_insights FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.conversations
      WHERE conversations.id = personality_insights.conversation_id
      AND conversations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create personality insights"
  ON public.personality_insights FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.conversations
      WHERE conversations.id = conversation_id
      AND conversations.user_id = auth.uid()
    )
  );

-- Create flashcards table
CREATE TABLE public.flashcards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  tags TEXT[],
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  last_reviewed_at TIMESTAMPTZ,
  next_review_at TIMESTAMPTZ,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.flashcards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own flashcards"
  ON public.flashcards FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own flashcards"
  ON public.flashcards FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own flashcards"
  ON public.flashcards FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own flashcards"
  ON public.flashcards FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Create triggers for updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.conversations
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.flashcards
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$;

-- Create trigger to auto-create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();