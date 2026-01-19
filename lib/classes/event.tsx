import { UUID } from "crypto";
import Sports from "../enum/sports";
import Venue from "../enum/venue";
import z from "zod";
import { eventSchema } from "../schema/schema";


type SportType = (typeof Sports)[number];
type VenueType = (typeof Venue)[number];

type EventType = z.infer<typeof eventSchema>;

export class Event implements EventType {
  id: string;
  eventName: string;
  sportType: SportType;
  date: string;
  time: string;       // ISO date-time
  description: string;
  venues: VenueType[];

  constructor(data: {
    id: UUID;
    eventName: string;
    sportType: SportType;
    date: string;
    time: string;
    description: string;
    venues: VenueType[];
  }) {
    this.id = data.id;
    this.eventName = data.eventName;
    this.sportType = data.sportType;
    this.date = data.date;
    this.time = data.time;
    this.description = data.description;

    // enforce uniqueness
    this.venues = Array.from(new Set(data.venues));
  }
}