'use server';

/**
 * @fileOverview AI-powered event poster creation flow.
 *
 * - createEventPoster - A function that generates an event poster using AI.
 * - CreateEventPosterInput - The input type for the createEventPoster function.
 * - CreateEventPosterOutput - The return type for the createEventPoster function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CreateEventPosterInputSchema = z.object({
  eventDescription: z
    .string()
    .describe('A description of the event for which to generate a poster.'),
});
export type CreateEventPosterInput = z.infer<typeof CreateEventPosterInputSchema>;

const CreateEventPosterOutputSchema = z.object({
  posterDataUri: z
    .string()
    .describe(
      "The generated event poster as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'"
    ),
});
export type CreateEventPosterOutput = z.infer<typeof CreateEventPosterOutputSchema>;

export async function createEventPoster(input: CreateEventPosterInput): Promise<CreateEventPosterOutput> {
  return createEventPosterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'createEventPosterPrompt',
  input: {schema: CreateEventPosterInputSchema},
  output: {schema: CreateEventPosterOutputSchema},
  prompt: `You are an AI-powered event poster generator. Generate a visually appealing poster for the following event description: {{{eventDescription}}}. Return the poster as a data URI.

Output should be a data URI with base64 encoding.  It must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'.  Be creative! Make it fun and tech-oriented. Use purple accents (#A096E6) and soft teal (#70A1AF) in the poster. Also incorporate subtle binary, grids, and line designs in the background.
`,
});

const createEventPosterFlow = ai.defineFlow(
  {
    name: 'createEventPosterFlow',
    inputSchema: CreateEventPosterInputSchema,
    outputSchema: CreateEventPosterOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: input.eventDescription,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media?.url) {
      throw new Error('Failed to generate event poster.');
    }

    return {posterDataUri: media.url};
  }
);
