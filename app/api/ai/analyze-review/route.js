import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI with the API key
const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function POST(request) {
  try {
    // 1. Validate Input
    if (!genAI) {
      return NextResponse.json(
        { error: 'Gemini API key is not configured.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { review } = body;

    if (!review || typeof review !== 'string' || review.trim() === '') {
      return NextResponse.json(
        { error: 'Review text is required and must be a non-empty string.' },
        { status: 400 }
      );
    }

    // 2. Build Structured Prompt for Gemini
    const prompt = `
You are an expert hospitality AI assistant. Analyze the following guest review and extract key insights.
Respond strictly in JSON format matching exactly this structure:
{
  "sentiment": "Positive, Neutral, or Negative",
  "rating": "Suggested rating out of 5 based on sentiment (e.g., '4/5')",
  "positivePoints": ["point 1", "point 2"],
  "negativePoints": ["point 1", "point 2"],
  "suggestions": ["suggestion 1", "suggestion 2"],
  "ownerReply": "A professional, empathetic, and polite reply to the guest from the property owner."
}

Do not include markdown formatting or markdown code blocks like \`\`\`json. Return ONLY the raw JSON string.

Guest Review:
"${review}"
`;

    // 3. Analyze the Review with Gemini
    const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash' });

    // Implement a 60-second timeout for the API call
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    let result;
    try {
      // In JS SDK for Gemini we might not be able to pass AbortSignal directly if it doesn't support it, 
      // but we can use Promise.race to enforce timeout.
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Gemini API request timed out')), 60000)
      );
      const apiPromise = model.generateContent(prompt);

      result = await Promise.race([apiPromise, timeoutPromise]);
    } finally {
      clearTimeout(timeoutId);
    }

    const response = await result.response;
    const text = response.text();

    // 4. Parse Response & Return Data
    let parsedData;
    try {
      // Strip any residual markdown formatting (e.g. ```json ... ```)
      const cleanText = text.replace(/```json\n?|\n?```/gi, '').trim();
      parsedData = JSON.parse(cleanText);
    } catch (parseError) {
      console.error('Failed to parse Gemini response as JSON:', text);
      return NextResponse.json(
        { error: 'Failed to process AI response into structured format.' },
        { status: 500 }
      );
    }

    // Ensure all expected keys are present in the response
    const finalResponse = {
      sentiment: parsedData.sentiment || 'Neutral',
      rating: parsedData.rating || 'N/A',
      positivePoints: Array.isArray(parsedData.positivePoints) ? parsedData.positivePoints : [],
      negativePoints: Array.isArray(parsedData.negativePoints) ? parsedData.negativePoints : [],
      suggestions: Array.isArray(parsedData.suggestions) ? parsedData.suggestions : [],
      ownerReply: parsedData.ownerReply || '',
    };

    return NextResponse.json(finalResponse, { status: 200 });

  } catch (error) {
    console.error('Error in analyze-review endpoint:', error);

    const statusCode = error.message === 'Gemini API request timed out' ? 504 : 500;
    const errorMessage = error.message || 'An unexpected error occurred while analyzing the review.';

    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    );
  }
}
