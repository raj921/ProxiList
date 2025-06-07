'use server';

import { smartSuggest, type SmartSuggestInput, type SmartSuggestOutput } from '@/ai/flows/smart-suggest';
import { z } from 'zod';

const SmartSuggestActionSchema = z.object({
  location: z.string().min(3, "Location must be at least 3 characters long."),
  purchaseHistory: z.string().optional(),
});

interface SmartSuggestFormState {
  message: string | null;
  suggestions: string | null;
  errors?: {
    location?: string[];
    purchaseHistory?: string[];
    _form?: string[];
  };
}

export async function handleSmartSuggest(
  prevState: SmartSuggestFormState,
  formData: FormData
): Promise<SmartSuggestFormState> {
  const validatedFields = SmartSuggestActionSchema.safeParse({
    location: formData.get('location'),
    purchaseHistory: formData.get('purchaseHistory'),
  });

  if (!validatedFields.success) {
    return {
      message: "Validation failed.",
      suggestions: null,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const input: SmartSuggestInput = {
    location: validatedFields.data.location,
    purchaseHistory: validatedFields.data.purchaseHistory || "none",
  };

  try {
    const result: SmartSuggestOutput = await smartSuggest(input);
    if (result.suggestedItems) {
      return {
        message: "Suggestions generated successfully!",
        suggestions: result.suggestedItems,
        errors: {}
      };
    } else {
       return { 
         message: "No suggestions available at this time.",
         suggestions: null,
         errors: { _form: ["AI model did not return suggestions."] }
       };
    }
  } catch (error) {
    console.error("Error in smartSuggest flow:", error);
    let errorMessage = "An unexpected error occurred.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return {
      message: "Failed to generate suggestions.",
      suggestions: null,
      errors: { _form: [errorMessage] }
    };
  }
}
