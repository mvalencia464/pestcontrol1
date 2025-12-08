import { GoogleGenAI, Type } from "@google/genai";
import { PestType, PestIdentificationResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a short, reassuring safety tip or fact based on the pest type
 * to keep the user engaged during the form process.
 */
export const getPestReassuranceTip = async (pest: PestType): Promise<string> => {
  try {
    const modelId = 'gemini-2.5-flash';
    const prompt = `Provide a single, short, reassuring sentence (under 15 words) for a homeowner worried about ${pest}. Focus on safety or how easy it is to treat. Do not be alarmist.`;
    
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });

    return response.text?.trim() || `We specialize in safe ${pest} removal treatments.`;
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback if API fails or key is missing
    return `Our ${pest} treatments are pet and family safe.`;
  }
};

/**
 * Analyzes an image of a pest and provides detailed, structured information.
 */
export const identifyPest = async (base64Image: string): Promise<PestIdentificationResult> => {
  const modelId = 'gemini-2.5-flash';

  const response = await ai.models.generateContent({
    model: modelId,
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: base64Image,
          },
        },
        {
          text: `Analyze this image and identify the pest. If it is not a pest or insect/rodent, return a result stating it is unknown. 
                 Provide a "localInsight" assuming a typical suburban environment, explaining why this pest might be appearing now (seasonality, weather, etc).
                 Return the result as JSON.`
        },
      ],
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Common name of the pest" },
          scientificName: { type: Type.STRING, description: "Scientific name" },
          dangerLevel: { type: Type.STRING, enum: ["Low", "Moderate", "High", "Critical"] },
          description: { type: Type.STRING, description: "Brief visual description and behavior" },
          localInsight: { type: Type.STRING, description: "Why it might be in the home right now (seasonality/location context)" },
          preventionTips: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "3 distinct bullet points for prevention" 
          },
          recommendedAction: { type: Type.STRING, description: "Immediate action for the homeowner" }
        },
        required: ["name", "scientificName", "dangerLevel", "description", "localInsight", "preventionTips", "recommendedAction"],
      }
    }
  });

  if (!response.text) {
    throw new Error("No response from AI");
  }

  return JSON.parse(response.text) as PestIdentificationResult;
};