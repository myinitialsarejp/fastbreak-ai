import Sports from "../enum/sports";
import Venue from "../enum/venue";

type SportType = (typeof Sports)[number];
type VenueType = (typeof Venue)[number];

export class Event {
  id: number;
  eventName: string;
  sportType: SportType;
  dateTime: string;       // ISO date-time
  description: string;
  venues: VenueType[];

  constructor(data: {
    id: number;
    eventName: string;
    sportType: SportType;
    dateTime: string;
    description: string;
    venues: VenueType[];
  }) {
    this.id = data.id;
    this.eventName = data.eventName;
    this.sportType = data.sportType;
    this.dateTime = data.dateTime;
    this.description = data.description;

    // enforce uniqueness
    this.venues = Array.from(new Set(data.venues));
  }
}