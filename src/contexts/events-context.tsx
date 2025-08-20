"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, addDoc, doc, query, where } from 'firebase/firestore';
import { useAuth } from './auth-context';

// Define the shape of a single event
export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  status: "upcoming" | "completed";
  formFields?: string[];
}

export interface Registration {
    eventId: string;
    feedbackSubmitted: boolean;
}

// Type for storing form data for registrations
export type RegistrationData = Record<string, string>;
export type AllRegistrations = Record<string, RegistrationData[]>;

// Define the shape of the context
interface EventsContextType {
  allEvents: Event[];
  addEvent: (event: Omit<Event, 'id'>) => Promise<void>;
  getEventById: (id: string) => Event | undefined;
  
  // Student-specific states
  registeredEvents: Registration[];
  isRegistered: (eventId: string) => boolean;

  // Combined registration logic
  registrations: AllRegistrations;
  registerForEvent: (eventId: string, formData: RegistrationData) => Promise<void>;
}

// Create the context
const EventsContext = createContext<EventsContextType | undefined>(undefined);

// Create the provider component
export const EventsProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [registeredEvents, setRegisteredEvents] = useState<Registration[]>([]);
  const [registrations, setRegistrations] = useState<AllRegistrations>({});
  const [loading, setLoading] = useState(true);

  // Fetch all events from Firestore
  useEffect(() => {
    setLoading(true);
    const q = collection(db, 'events');
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const eventsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
      setAllEvents(eventsData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Fetch student's registrations
  useEffect(() => {
    if (user?.uid && user.role === 'student') {
        const q = collection(db, `users/${user.uid}/registrations`);
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const regs = snapshot.docs.map(doc => doc.data() as Registration);
            setRegisteredEvents(regs);
        });
        return () => unsubscribe();
    } else {
        setRegisteredEvents([]);
    }
  }, [user]);

   // Fetch all registrations for faculty
  useEffect(() => {
    if (user?.role === 'faculty' && allEvents.length > 0) {
      const allRegs: AllRegistrations = {};
      const promises = allEvents.map(event => {
        const q = collection(db, `events/${event.id}/registrations`);
        return new Promise<void>(resolve => {
          onSnapshot(q, (snapshot) => {
            allRegs[event.id] = snapshot.docs.map(doc => doc.data() as RegistrationData);
            resolve();
          });
        });
      });
      Promise.all(promises).then(() => {
        setRegistrations(allRegs);
      })
    }
  }, [user, allEvents]);


  const addEvent = async (event: Omit<Event, 'id'>) => {
    try {
      await addDoc(collection(db, 'events'), event);
    } catch (error) {
      console.error("Error adding event: ", error);
    }
  };

  const getEventById = (id: string) => {
      return allEvents.find(event => event.id === id);
  }

  const registerForEvent = async (eventId: string, formData: RegistrationData) => {
      if (!user?.uid) {
          throw new Error("User not logged in.");
      }
      try {
          // Add to the specific event's registration subcollection
          await addDoc(collection(db, `events/${eventId}/registrations`), {
              studentId: user.uid,
              ...formData
          });

          // Add to the user's personal registration list
          await addDoc(collection(db, `users/${user.uid}/registrations`), {
              eventId,
              feedbackSubmitted: false,
          });

      } catch (error) {
          console.error("Error registering for event:", error);
      }
  };

  const isRegistered = (eventId: string) => {
      return registeredEvents.some(reg => reg.eventId === eventId);
  }

  return (
    <EventsContext.Provider value={{ allEvents, addEvent, getEventById, registeredEvents, isRegistered, registrations, registerForEvent }}>
      {!loading && children}
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
