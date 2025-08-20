
"use client";

import { useEvents } from "@/contexts/events-context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface EventRegistrationsDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  eventName: string;
  eventId: string;
  formFields: string[];
}

// A helper to format the field ID into a readable label
const formatLabel = (id: string) => {
    return id.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
};

export function EventRegistrationsDialog({
  isOpen,
  onOpenChange,
  eventName,
  eventId,
  formFields,
}: EventRegistrationsDialogProps) {
  const { registrations } = useEvents();
  const eventRegistrations = registrations[eventId] || [];
  const displayFields = ['studentId', ...formFields];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Registrations for {eventName}</DialogTitle>
          <DialogDescription>
            {eventRegistrations.length > 0
              ? `A total of ${eventRegistrations.length} student(s) have registered.`
              : "No students have registered for this event yet."}
          </DialogDescription>
        </DialogHeader>
        {eventRegistrations.length > 0 && (
          <div className="max-h-[60vh] overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-background">
                <TableRow>
                  {displayFields.map((field) => (
                    <TableHead key={field}>{formatLabel(field)}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {eventRegistrations.map((registrationData, index) => (
                  <TableRow key={index}>
                    {displayFields.map((field) => (
                      <TableCell key={field}>
                        {registrationData[field] || 'N/A'}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
