// src/ai/flows/smart-suggest.ts
'use server';
/**
 * @fileOverview A smart suggestion AI agent that recommends items to add to the shopping list based on the user's location and past purchases.
 *
 * - smartSuggest - A function that handles the smart suggestion process.
 * - SmartSuggestInput - The input type for the smartSuggest function.
 * - SmartSuggestOutput - The return type for the smartSuggest function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartSuggestInputSchema = z.object({
  location: z
    .string()
    .describe("The user's current location.  For example, 'near Safeway on Main Street'."),
  purchaseHistory: z
    .string()
    .describe('A comma separated list of the users past purchases.'),
});
export type SmartSuggestInput = z.infer<typeof SmartSuggestInputSchema>;

const SmartSuggestOutputSchema = z.object({
  suggestedItems: z
    .string()
    .describe('A comma separated list of suggested items to add to the shopping list.'),
});
export type SmartSuggestOutput = z.infer<typeof SmartSuggestOutputSchema>;

export async function smartSuggest(input: SmartSuggestInput): Promise<SmartSuggestOutput> {
  return smartSuggestFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartSuggestPrompt',
  input: {schema: SmartSuggestInputSchema},
  output: {schema: SmartSuggestOutputSchema},
  prompt: `Based on the user's current location and past purchases, suggest items to add to their shopping list.

Location: {{{location}}}
Past Purchases: {{{purchaseHistory}}}

Suggested Items:`,
});

const smartSuggestFlow = ai.defineFlow(
  {
    name: 'smartSuggestFlow',
    inputSchema: SmartSuggestInputSchema,
    outputSchema: SmartSuggestOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
