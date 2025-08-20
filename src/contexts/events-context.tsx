
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
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

interface Registration {
    eventId: string;
    feedbackSubmitted: boolean;
}

// Define the shape of the context
interface EventsContextType {
  allEvents: Event[];
  addEvent: (event: Event) => void;
  getEventById: (id: string) => Event | undefined;
  registeredEvents: Registration[];
  registerForEvent: (eventId: string) => void;
  isRegistered: (eventId: string) => boolean;
}

// Create the context
const EventsContext = createContext<EventsContextType | undefined>(undefined);

// Create the provider component
export const EventsProvider = ({ children }: { children: ReactNode }) => {
  const [allEvents, setAllEvents] = useState<Event[]>(mockEvents);
  const [registeredEvents, setRegisteredEvents] = useState<Registration[]>([]);

  useEffect(() => {
    const storedRegistrations = localStorage.getItem('registeredEvents');
    if (storedRegistrations) {
        setRegisteredEvents(JSON.parse(storedRegistrations));
    }
  }, []);

  const updateLocalStorage = (regs: Registration[]) => {
      localStorage.setItem('registeredEvents', JSON.stringify(regs));
  };

  const addEvent = (event: Event) => {
    setAllEvents((prevEvents) => [event, ...prevEvents]);
  };

  const getEventById = (id: string) => {
      return allEvents.find(event => event.id === id);
  }

  const registerForEvent = (eventId: string) => {
      setRegisteredEvents(prev => {
          const newRegs = [...prev, { eventId, feedbackSubmitted: false }];
          updateLocalStorage(newRegs);
          return newRegs;
      });
  };

  const isRegistered = (eventId: string) => {
      return registeredEvents.some(reg => reg.eventId === eventId);
  }

  return (
    <EventsContext.Provider value={{ allEvents, addEvent, getEventById, registeredEvents, registerForEvent, isRegistered }}>
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
