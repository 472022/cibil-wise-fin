import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { income, existingLoans, paymentHistory, creditUtilization, recentInquiries } = await req.json();
    console.log('CIBIL prediction request:', { income, existingLoans, paymentHistory, creditUtilization, recentInquiries });

    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not configured');
      throw new Error('GEMINI_API_KEY is not configured');
    }

    // Build AI prompt for CIBIL score prediction
    const prompt = `You are a CIBIL score prediction expert. Based on the following financial information, predict a realistic CIBIL score and provide detailed analysis.

User Financial Data:
- Monthly Income: ₹${income}
- Existing Loans: ${existingLoans}
- Payment History: ${paymentHistory}
- Credit Utilization: ${creditUtilization}%
- Recent Credit Inquiries: ${recentInquiries}

Provide your response STRICTLY in this JSON format (no markdown, no code blocks):
{
  "predicted_score": <number between 300-900>,
  "factors": [
    {"name": "Payment History", "impact": <number 0-100>, "positive": <true/false>},
    {"name": "Credit Utilization", "impact": <number 0-100>, "positive": <true/false>},
    {"name": "Credit Age", "impact": <number 0-100>, "positive": <true/false>},
    {"name": "Recent Inquiries", "impact": <number 0-100>, "positive": <true/false>}
  ],
  "suggestions": [
    "<actionable suggestion 1>",
    "<actionable suggestion 2>",
    "<actionable suggestion 3>",
    "<actionable suggestion 4>"
  ]
}`;

    console.log('Calling Gemini API...');
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.4,
          topK: 32,
          topP: 1,
          maxOutputTokens: 2048,
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Gemini response received');
    
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!generatedText) {
      console.error('No text generated from Gemini');
      throw new Error('No prediction generated');
    }

    // Clean up the response to extract JSON
    let jsonText = generatedText.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```\n?/g, '');
    }

    const prediction = JSON.parse(jsonText);
    console.log('Parsed prediction:', prediction);

    // Get user from auth header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      console.error('User authentication error:', userError);
      throw new Error('Unauthorized');
    }

    // Save prediction to database
    const { error: insertError } = await supabase
      .from('cibil_predictions')
      .insert({
        user_id: user.id,
        income: parseFloat(income),
        existing_loans: parseInt(existingLoans),
        payment_history: paymentHistory,
        credit_utilization: parseInt(creditUtilization),
        recent_inquiries: parseInt(recentInquiries),
        predicted_score: prediction.predicted_score,
        factors: prediction.factors,
        suggestions: prediction.suggestions
      });

    if (insertError) {
      console.error('Database insert error:', insertError);
      throw new Error('Failed to save prediction');
    }

    // Update user's current CIBIL score in profile
    await supabase
      .from('profiles')
      .update({ current_cibil_score: prediction.predicted_score })
      .eq('id', user.id);

    console.log('Prediction saved successfully');

    return new Response(JSON.stringify(prediction), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error in predict-cibil function:', error);
    return new Response(JSON.stringify({ error: error?.message || 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});