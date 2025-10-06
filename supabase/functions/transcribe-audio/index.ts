import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { audioUrl, conversationId } = await req.json();
    console.log('Transcribing audio:', { audioUrl, conversationId });

    if (!audioUrl || !conversationId) {
      throw new Error('audioUrl and conversationId are required');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Download audio from storage
    const { data: audioData, error: downloadError } = await supabase
      .storage
      .from('recordings')
      .download(audioUrl);

    if (downloadError) {
      console.error('Download error:', downloadError);
      throw new Error(`Failed to download audio: ${downloadError.message}`);
    }

    console.log('Audio downloaded, converting to base64...');
    const audioBuffer = await audioData.arrayBuffer();
    const base64Audio = btoa(String.fromCharCode(...new Uint8Array(audioBuffer)));

    // Use Lovable AI to transcribe (Gemini can handle audio)
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    console.log('Sending to Lovable AI for transcription...');
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Please transcribe this audio recording. Provide the full text transcription. If there are multiple speakers, try to identify them as Speaker 1, Speaker 2, etc.'
              },
              {
                type: 'audio',
                audio: base64Audio
              }
            ]
          }
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI API error:', aiResponse.status, errorText);
      throw new Error(`AI transcription failed: ${errorText}`);
    }

    const aiResult = await aiResponse.json();
    const transcription = aiResult.choices[0].message.content;
    console.log('Transcription complete');

    // Save transcript to database
    const { error: insertError } = await supabase
      .from('transcripts')
      .insert({
        conversation_id: conversationId,
        full_text: transcription,
        language: 'en',
      });

    if (insertError) {
      console.error('Insert transcript error:', insertError);
      throw insertError;
    }

    // Update conversation status
    const { error: updateError } = await supabase
      .from('conversations')
      .update({ status: 'transcribed' })
      .eq('id', conversationId);

    if (updateError) {
      console.error('Update conversation error:', updateError);
      throw updateError;
    }

    console.log('Transcript saved successfully');

    return new Response(
      JSON.stringify({ success: true, transcription }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Transcription error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});