import { z } from "zod";
import Sports from "../enum/sports";
import Venue from "../enum/venue";

export const eventSchema = z.object({
  id: z.number().min(1),
  eventName: z.string().min(3),
  sportType: z.enum(Sports),
  dateTime: z.iso.datetime(),
  description: z.string().min(10),
  venues: z.array(z.enum(Venue))
    .min(1)
    .refine(
      (arr) => new Set(arr).size === arr.length,
      "venues must contain unique items"
    ),
});