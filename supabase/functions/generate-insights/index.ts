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
    const { conversationId } = await req.json();
    console.log('Generating insights for conversation:', conversationId);

    if (!conversationId) {
      throw new Error('conversationId is required');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get transcript
    const { data: transcript, error: transcriptError } = await supabase
      .from('transcripts')
      .select('full_text')
      .eq('conversation_id', conversationId)
      .single();

    if (transcriptError || !transcript) {
      throw new Error('Transcript not found');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Generate summary
    console.log('Generating summary...');
    const summaryResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: 'You are an expert at analyzing conversations and extracting key insights. Provide structured, actionable summaries.'
          },
          {
            role: 'user',
            content: `Analyze this conversation transcript and provide:
1. A one-line summary (max 100 characters)
2. 3-5 key points (each max 150 characters)
3. 3-5 main topics covered
4. Any action items or next steps (if applicable)

Format your response as JSON with keys: one_line_summary, key_points (array), main_topics (array), action_items (array).

Transcript:
${transcript.full_text}`
          }
        ],
      }),
    });

    if (!summaryResponse.ok) {
      const errorText = await summaryResponse.text();
      console.error('Summary AI error:', summaryResponse.status, errorText);
      throw new Error(`Summary generation failed: ${errorText}`);
    }

    const summaryResult = await summaryResponse.json();
    const summaryText = summaryResult.choices[0].message.content;
    
    // Parse JSON from AI response
    let summary;
    try {
      // Try to extract JSON from markdown code blocks if present
      const jsonMatch = summaryText.match(/```json\n([\s\S]*?)\n```/) || summaryText.match(/```\n([\s\S]*?)\n```/);
      const jsonText = jsonMatch ? jsonMatch[1] : summaryText;
      summary = JSON.parse(jsonText);
    } catch {
      // Fallback if JSON parsing fails
      summary = {
        one_line_summary: summaryText.substring(0, 100),
        key_points: ['Summary generated'],
        main_topics: ['Conversation'],
        action_items: []
      };
    }

    console.log('Summary generated:', summary);

    // Save summary to database
    const { error: summaryInsertError } = await supabase
      .from('summaries')
      .insert({
        conversation_id: conversationId,
        one_line_summary: summary.one_line_summary,
        key_points: summary.key_points,
        main_topics: summary.main_topics,
        action_items: summary.action_items || []
      });

    if (summaryInsertError) {
      console.error('Insert summary error:', summaryInsertError);
      throw summaryInsertError;
    }

    // Generate personality insights
    console.log('Generating personality insights...');
    const insightsResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: 'You are a professional conversation analyst. Extract personality traits and communication styles from conversation transcripts.'
          },
          {
            role: 'user',
            content: `Analyze the speakers in this conversation and identify personality traits, communication styles, and notable characteristics.

For each speaker mentioned, provide:
- Speaker name/identifier
- 3-5 key personality insights
- Relevant tags (e.g., analytical, creative, assertive, empathetic)

Format as JSON with key "speakers", which is an array of objects with keys: person_name, insights (array), tags (array).

Transcript:
${transcript.full_text}`
          }
        ],
      }),
    });

    if (!insightsResponse.ok) {
      console.error('Insights AI error:', insightsResponse.status);
    } else {
      const insightsResult = await insightsResponse.json();
      const insightsText = insightsResult.choices[0].message.content;
      
      let speakerInsights;
      try {
        const jsonMatch = insightsText.match(/```json\n([\s\S]*?)\n```/) || insightsText.match(/```\n([\s\S]*?)\n```/);
        const jsonText = jsonMatch ? jsonMatch[1] : insightsText;
        speakerInsights = JSON.parse(jsonText);
        
        // Save personality insights for each speaker
        if (speakerInsights.speakers && Array.isArray(speakerInsights.speakers)) {
          for (const speaker of speakerInsights.speakers) {
            await supabase
              .from('personality_insights')
              .insert({
                conversation_id: conversationId,
                person_name: speaker.person_name,
                insights: speaker.insights,
                tags: speaker.tags || []
              });
          }
          console.log('Personality insights saved');
        }
      } catch (e) {
        console.error('Failed to parse personality insights:', e);
      }
    }

    // Update conversation status to completed
    const { error: updateError } = await supabase
      .from('conversations')
      .update({ status: 'completed' })
      .eq('id', conversationId);

    if (updateError) {
      console.error('Update conversation error:', updateError);
    }

    return new Response(
      JSON.stringify({ success: true, summary }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Insights generation error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});