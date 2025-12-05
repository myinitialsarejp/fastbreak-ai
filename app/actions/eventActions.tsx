"use server";

import { eventSchema } from "@/lib/schema/schema";
import z from "zod";
import { createClient } from "@/lib/supabase/server";

// Add event
export const addEvent = async (d: z.infer<typeof eventSchema>) => {
  // Implementation for adding event to the database
  const supabase = await createClient();
  const { error } = await supabase.from("events").insert(d);

  return error
};

// Delete event
const deleteEvent = async (eventId: string) => {
  // Implementation for deleting event from the database
  const supabase = await createClient();
};

// Update/edit event
export const updateEvent = async (d: z.infer<typeof eventSchema>) => {
  // Implementation for updating event in the database
  const supabase = await createClient();

    const { data, error } = await supabase.from("events").update(d).eq("id", d.id).select();
    
    if(data){
        console.log("Event updated successfully:", data);
    }
    return error
};

// Fetch events
const fetchEvents = async () => {
  // Implementation for fetching events from the database
  const supabase = await createClient();
};
