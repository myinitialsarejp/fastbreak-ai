import { z } from "zod";
import Sport from "../enum/sports";
import Venue from "../enum/venue";

export const eventSchema = z.object({
  id: z.uuid(),
  eventName: z.string().min(3, "Event name must be at least 3 characters"),
  sportType: z.enum(Sport, { message: "Please select a sport type" }),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  description: z.string().optional(),
  venues: z.array(z.enum(Venue))
    .min(1, "Please select at least one venue")
    .refine(
      (arr) => new Set(arr).size === arr.length,
      "venues must contain unique items"
    ),
});