
"use client";

import { useState } from "react";
import { useEvents } from "@/contexts/events-context";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface EventRegistrationDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  eventName: string;
  eventId: string;
  formFields: string[];
}

export function EventRegistrationDialog({
  isOpen,
  onOpenChange,
  eventName,
  eventId,
  formFields,
}: EventRegistrationDialogProps) {
  const { toast } = useToast();
  const { registerForEvent } = useEvents();
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Basic validation
    for (const field of formFields) {
        // Simple check if required fields are filled, can be made more robust
        if (field === 'name' || field === 'email') {
            if (!formData[field]) {
                 toast({
                    title: "Missing Information",
                    description: `Please fill out the ${field} field.`,
                    variant: "destructive",
                });
                return;
            }
        }
    }

    registerForEvent(eventId, formData);
    toast({
      title: "Registration Successful!",
      description: `You have registered for ${eventName}.`,
    });
    onOpenChange(false);
  };

  // A helper to format the field ID into a readable label
  const formatLabel = (id: string) => {
    return id.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
  };


  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register for {eventName}</DialogTitle>
          <DialogDescription>
            Please fill out your details to register for this event.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {formFields.map((field) => (
            <div key={field} className="space-y-2">
              <Label htmlFor={field}>{formatLabel(field)}</Label>
              <Input
                id={field}
                value={formData[field] || ""}
                onChange={(e) => handleInputChange(field, e.target.value)}
                placeholder={`Enter your ${formatLabel(field).toLowerCase()}`}
              />
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit Registration</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
