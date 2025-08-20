"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { events as mockEvents } from '@/lib/mock-data';

// Define the shape of a single event
interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  status: "upcoming" | "completed";
  formFields?: string[];
}

// Define the shape of the context
interface EventsContextType {
  allEvents: Event[];
  addEvent: (event: Event) => void;
}

// Create the context
const EventsContext = createContext<EventsContextType | undefined>(undefined);

// Create the provider component
export const EventsProvider = ({ children }: { children: ReactNode }) => {
  const [allEvents, setAllEvents] = useState<Event[]>(mockEvents);

  const addEvent = (event: Event) => {
    setAllEvents((prevEvents) => [event, ...prevEvents]);
  };

  return (
    <EventsContext.Provider value={{ allEvents, addEvent }}>
      {children}
    </EventsContext.Provider>
  );
};

// Create a custom hook for using the context
export const useEvents = () => {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
};
