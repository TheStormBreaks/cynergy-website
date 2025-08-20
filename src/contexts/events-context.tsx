
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

// Type for storing form data for registrations
type RegistrationData = Record<string, string>;
type AllRegistrations = Record<string, RegistrationData[]>;

// Define the shape of the context
interface EventsContextType {
  allEvents: Event[];
  addEvent: (event: Event) => void;
  getEventById: (id: string) => Event | undefined;
  
  // Student-specific states
  registeredEvents: Registration[];
  isRegistered: (eventId: string) => boolean;

  // Combined registration logic
  registrations: AllRegistrations;
  registerForEvent: (eventId: string, formData: RegistrationData) => void;
}

// Create the context
const EventsContext = createContext<EventsContextType | undefined>(undefined);

// Create the provider component
export const EventsProvider = ({ children }: { children: ReactNode }) => {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [registeredEvents, setRegisteredEvents] = useState<Registration[]>([]);
  const [registrations, setRegistrations] = useState<AllRegistrations>({});

  // Load initial data from localStorage on mount
  useEffect(() => {
    const storedEvents = localStorage.getItem('allEvents');
    if (storedEvents) {
      setAllEvents(JSON.parse(storedEvents));
    } else {
      setAllEvents(mockEvents); // Fallback to mock data if nothing is stored
    }
    
    const storedStudentRegs = localStorage.getItem('registeredEvents');
    if (storedStudentRegs) {
        setRegisteredEvents(JSON.parse(storedStudentRegs));
    }
    
    const storedAllRegs = localStorage.getItem('allRegistrations');
    if(storedAllRegs) {
        setRegistrations(JSON.parse(storedAllRegs));
    }
  }, []);

  // Persist allEvents to localStorage
  useEffect(() => {
    if (allEvents.length > 0) { // Only save if there's something to save
        localStorage.setItem('allEvents', JSON.stringify(allEvents));
    }
  }, [allEvents]);

  // Persist registeredEvents to localStorage
  useEffect(() => {
    localStorage.setItem('registeredEvents', JSON.stringify(registeredEvents));
  }, [registeredEvents]);

  // Persist registrations to localStorage
  useEffect(() => {
    localStorage.setItem('allRegistrations', JSON.stringify(registrations));
  }, [registrations]);


  const addEvent = (event: Event) => {
    setAllEvents((prevEvents) => [event, ...prevEvents]);
  };

  const getEventById = (id: string) => {
      return allEvents.find(event => event.id === id);
  }

  const registerForEvent = (eventId: string, formData: RegistrationData) => {
      // Update student's personal registration list
      setRegisteredEvents(prev => {
          const newRegs = [...prev, { eventId, feedbackSubmitted: false }];
          return newRegs;
      });

      // Add the detailed registration data for faculty view
      setRegistrations(prev => {
          const updatedEventRegistrations = [...(prev[eventId] || []), formData];
          const newAllRegs = { ...prev, [eventId]: updatedEventRegistrations };
          return newAllRegs;
      });
  };

  const isRegistered = (eventId: string) => {
      return registeredEvents.some(reg => reg.eventId === eventId);
  }

  return (
    <EventsContext.Provider value={{ allEvents, addEvent, getEventById, registeredEvents, isRegistered, registrations, registerForEvent }}>
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
