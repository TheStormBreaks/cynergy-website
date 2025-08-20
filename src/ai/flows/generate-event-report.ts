'use server';

/**
 * @fileOverview An event report generation AI agent.
 *
 * - generateEventReport - A function that handles the event report generation process.
 * - GenerateEventReportInput - The input type for the generateEventReport function.
 * - GenerateEventReportOutput - The return type for the generateEventReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEventReportInputSchema = z.object({
  eventName: z.string().describe('The name of the event.'),
  feedbackSummary: z
    .string()
    .describe('A summary of the feedback received for the event.'),
  participationSummary: z
    .string()
    .describe('A summary of the participation in the event.'),
  additionalNotes: z.string().optional().describe('Any additional notes about the event.'),
});
export type GenerateEventReportInput = z.infer<typeof GenerateEventReportInputSchema>;

const GenerateEventReportOutputSchema = z.object({
  report: z.string().describe('The generated event report.'),
});
export type GenerateEventReportOutput = z.infer<typeof GenerateEventReportOutputSchema>;

export async function generateEventReport(input: GenerateEventReportInput): Promise<GenerateEventReportOutput> {
  return generateEventReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateEventReportPrompt',
  input: {schema: GenerateEventReportInputSchema},
  output: {schema: GenerateEventReportOutputSchema},
  prompt: `You are an AI assistant that generates summary reports for events.

  You will be provided with the event name, a summary of the feedback received, a summary of the participation, and any additional notes.
  Using this information, generate a comprehensive event report that includes key insights and recommendations for future events.

  Event Name: {{{eventName}}}
  Feedback Summary: {{{feedbackSummary}}}
  Participation Summary: {{{participationSummary}}}
  Additional Notes: {{{additionalNotes}}}

  Report:
  `,
});

const generateEventReportFlow = ai.defineFlow(
  {
    name: 'generateEventReportFlow',
    inputSchema: GenerateEventReportInputSchema,
    outputSchema: GenerateEventReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
