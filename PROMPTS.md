# Prompt Engineering Documentation

## Objective
The goal is to analyze guest reviews for a hospitality property, extracting key insights such as sentiment, suggested rating, positive points, negative points, improvement suggestions, and generating a professional owner reply. The output must strictly be in JSON format.

## Example Input
```text
Guest Review:
"We had an amazing stay overall. The views were breathtaking and the local Buckwheat pancakes were a highlight! The staff, especially Rohan, went out of their way to make us comfortable. However, our room in the attic got very cold at night, and the heater wasn't working properly. Also, the Wi-Fi kept disconnecting during our zoom meetings."
```

## Example Output (Expected Structure)
```json
{
  "sentiment": "Positive",
  "rating": "4/5",
  "positivePoints": [
    "Breathtaking views",
    "Delicious local Buckwheat pancakes",
    "Excellent staff service, specifically Rohan"
  ],
  "negativePoints": [
    "Attic room was very cold at night",
    "Room heater was malfunctioning",
    "Unreliable Wi-Fi connection"
  ],
  "suggestions": [
    "Ensure all room heaters are inspected and functioning, especially in attic rooms.",
    "Upgrade or troubleshoot the Wi-Fi network to provide a stable connection for remote workers.",
    "Consider offering extra blankets proactively for guests staying in colder rooms."
  ],
  "ownerReply": "Dear Guest, thank you so much for your kind words! We are thrilled that you enjoyed the breathtaking views and our signature Buckwheat pancakes, and I will be sure to pass along your compliments to Rohan. We sincerely apologize for the inconvenience you faced with the room heater and the Wi-Fi connection. Your comfort is our priority, and our maintenance team is already looking into both issues to ensure they are resolved. We hope to have the pleasure of welcoming you back for a flawless stay in the future."
}
```

---

## Prompt Variations

### Variation 1: The Basic Prompt (Zero-Shot)
**Prompt:**
> Analyze this guest review. Give me the sentiment, a rating out of 5, positive points, negative points, suggestions for improvement, and a reply from the owner. Return it as JSON.
> Review: "[REVIEW_TEXT]"

**Result:**
Often failed to return strict JSON (included markdown ```json wrappers or conversational text like "Here is your analysis:"). The structure of the JSON keys was inconsistent across multiple requests (e.g., sometimes returning `positives` instead of `positivePoints`).

### Variation 2: The Structured Prompt
**Prompt:**
> You are an AI assistant. Analyze the guest review and output a JSON object with exactly these keys: "sentiment", "rating", "positivePoints", "negativePoints", "suggestions", "ownerReply".
> The arrays should contain strings. The sentiment should be Positive, Neutral, or Negative. 
> 
> Guest Review: "[REVIEW_TEXT]"

**Result:**
Much better JSON consistency. However, the `ownerReply` lacked empathy and sounded too robotic. Furthermore, the model sometimes still included markdown code block ticks (` ```json `), which broke native `JSON.parse()` without defensive parsing on the backend.

### Variation 3: The Persona-Driven Strict JSON Prompt (Best Performing)
**Prompt:**
> You are an expert hospitality AI assistant. Analyze the following guest review and extract key insights.
> Respond strictly in JSON format matching exactly this structure:
> {
>   "sentiment": "Positive, Neutral, or Negative",
>   "rating": "Suggested rating out of 5 based on sentiment (e.g., '4/5')",
>   "positivePoints": ["point 1", "point 2"],
>   "negativePoints": ["point 1", "point 2"],
>   "suggestions": ["suggestion 1", "suggestion 2"],
>   "ownerReply": "A professional, empathetic, and polite reply to the guest from the property owner."
> }
> 
> Do not include markdown formatting or markdown code blocks like \`\`\`json. Return ONLY the raw JSON string.
> 
> Guest Review:
> "[REVIEW_TEXT]"

**Result:**
Excellent performance. The persona ("expert hospitality AI assistant") significantly improved the tone, empathy, and professionalism of the `ownerReply` and the actionable quality of the `suggestions`. Explicitly providing the JSON template and explicitly banning markdown formatting drastically reduced parsing errors on the backend.

---

## Best-Performing Prompt & Reasoning

**Selected Prompt:** Variation 3

**Reason for Choosing it:**
1. **Persona Injection:** Setting the role to "expert hospitality AI assistant" primes the LLM to use industry-standard terminology and generate a highly professional and empathetic owner reply.
2. **Explicit Schema Definition:** Providing a literal JSON template guarantees that the keys match what the Next.js backend expects (`positivePoints`, `negativePoints`, etc.).
3. **Format Enforcement:** Explicitly stating "Do not include markdown formatting or markdown code blocks" minimizes the chance of the LLM wrapping the response in ` ```json `, making it immediately parsable by `JSON.parse()`. (We still added regex cleanup on the backend as a fallback, but this prompt handles it natively 99% of the time).

## System Prompt Used (in the Backend Integration)
The finalized prompt used in `app/api/ai/analyze-review/route.js` is:

```javascript
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
```
