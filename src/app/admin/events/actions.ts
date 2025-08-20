
"use server";

import { createEventPoster } from "@/ai/flows/create-event-poster";
import { generateEventReport } from "@/ai/flows/generate-event-report";
import { z } from "zod";

const posterSchema = z.object({
  eventDescription: z.string(),
});

export async function generatePosterAction(data: { eventDescription: string }) {
  const validatedData = posterSchema.safeParse(data);
  if (!validatedData.success) {
    return { error: "Invalid input." };
  }
  try {
    const result = await createEventPoster(validatedData.data);
    return { posterDataUri: result.posterDataUri };
  } catch (e) {
    return { error: "Failed to generate poster." };
  }
}

const reportSchema = z.object({
  eventName: z.string(),
  feedbackSummary: z.string(),
  participationSummary: z.string(),
  additionalNotes: z.string().optional(),
});

export async function generateReportAction(data: {
  eventName: string;
  feedbackSummary: string;
  participationSummary: string;
  additionalNotes?: string;
}) {
  const validatedData = reportSchema.safeParse(data);
  if (!validatedData.success) {
    return { error: "Invalid input." };
  }
  try {
    const result = await generateEventReport(validatedData.data);
    return { report: result.report };
  } catch (e) {
    return { error: "Failed to generate report." };
  }
}
