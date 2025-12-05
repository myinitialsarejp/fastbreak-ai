"use client";

import { Event } from "@/lib/classes/event";
import { eventSchema } from "@/lib/schema/schema";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectGroup,
} from "./ui/select";
import Sport from "@/lib/enum/sports";
import Venue from "@/lib/enum/venue";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "./ui/multi-select";
import { CalendarField } from "./CalendarField";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { addEvent, updateEvent } from "@/app/actions/eventActions";  
interface EventCardProps {
  editMode: boolean;
  event?: Event;
}
const EventCard = ({ editMode, event }: EventCardProps) => {
  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: event ?? {
      id: crypto.randomUUID(),
      eventName: "",
      sportType: "",
      date: "",
      time: "",
      description: "",
      venues: [],
    },
  });

  const handleSubmit = async (data: z.infer<typeof eventSchema>) => {
    // Server action for creating/updating event goes here
    console.log("Form submitted with data:", data);
    if(editMode) {
        // Update existing event
        const error = await updateEvent(data);
        if(error) {
            // Error toast message
            console.log("Error updating event:", error);
        }
    }
    else{
        // Create new event
        const error = await addEvent(data);
        if(error) {
            // Error toast message
            console.log("Error adding event:", error);
        }
    }
  };

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>{editMode ? "Edit Event" : "Create Event"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="eventName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter event name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sportType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sport Type</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a sport type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Sport Types</SelectLabel>
                          {Sport.filter((sport) => sport !== "").map(
                            (sport) => (
                              <SelectItem value={sport} key={sport}>
                                {sport}
                              </SelectItem>
                            )
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4 w-full">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CalendarField field={field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col gap-3">
                        <Label htmlFor="time-picker" className="px-1">
                          Time
                        </Label>
                        <Input
                          {...field}
                          type="time"
                          id="time-picker"
                          step="1"
                          defaultValue="10:30:00"
                          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="venues"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Venue(s)</FormLabel>
                  <FormControl>
                    <MultiSelect
                      values={field.value}
                      onValuesChange={field.onChange}
                    >
                      <MultiSelectTrigger className="w-full">
                        <MultiSelectValue placeholder="Select venue(s)" />
                      </MultiSelectTrigger>
                      <MultiSelectContent>
                        <MultiSelectGroup>
                          {Venue.map((venue) => (
                            <MultiSelectItem key={venue} value={venue}>
                              {venue}
                            </MultiSelectItem>
                          ))}
                        </MultiSelectGroup>
                      </MultiSelectContent>
                    </MultiSelect>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className={"flex flex-row justify-between pl-8 pr-8"}>
              <Button type="submit">
                {editMode ? "Update Event" : "Create Event"}
              </Button>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EventCard;
