import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Event } from "@/lib/classes/event";
import { ScrollArea } from "./ui/scroll-area";
import { Pencil } from "lucide-react";

const Home = () => {
  // Sample events for demonstration purposes
  const events: Event[] = [
    new Event({
      id: "",
      eventName: "Morning Basketball",
      sportType: "Basketball",
      date: new Date().toISOString().split("T")[0],
      time: "09:00:00",
      description: "Morning basketball session at the local gym.",
      venues: ["Stadium"],
    }),
    new Event({
      id: "",
      eventName: "Evening Soccer",
      sportType: "Soccer",
      date: new Date().toISOString().split("T")[0],
      time: "18:00:00",
      description: "Evening soccer match at the local field. Evening soccer match at the local field.Evening soccer match at the local field.Evening soccer match at the local field.Evening soccer match at the local field.Evening soccer match at the local field.Evening soccer match at the local field.Evening soccer match at the local field.Evening soccer match at the local field.Evening soccer match at the local field.",
      venues: ["Stadium"],
    }),
  ];

  return (
    <Card className="w-4/5 h-4/5 p-8 flex items-center justify-center">
      <CardHeader className="w-full justify-center items-center text-center">
        <CardTitle>Welcome to Fastbreak AI!</CardTitle>
        <CardDescription>
          Below are your events for today. Click "Add Event" to create a new
          event.
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full flex flex-col items-center justify-center gap-4">
        <Card className="w-full p-4">
          <CardHeader>
            <CardTitle>Today's Events</CardTitle>
          </CardHeader>
          <CardContent>
            {events.length === 0 ? (
              <p>No events for today.</p>
            ) : (
              <ul>
                <ScrollArea className="h-64">
                  {events.map((event) => (
                    <p key={event.sportType} className="mb-2">
                      <CardAction className="w-full p-4 border rounded-lg hover:bg-gray-100">
                        <div className="flex justify-between w-full">
                          <div>
                            <h3 className="font-bold">{event.eventName}</h3>
                            <p className="text-sm text-gray-600">
                              {event.sportType}
                            </p>
                          </div>
                            <ScrollArea className="max-h-16 max-w-1/2 text-sm text-gray-600 overflow-y-auto">
                              {event.description}
                            </ScrollArea>
                        
                          <div className="flex flex-row items-center gap-4">
                            <div className="flex flex-col items-end">
                              <div className="text-sm text-gray-600">
                                {new Date(event.date).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </div>
                              <div className="text-sm text-gray-600">
                                {event.venues.join(", ")}
                              </div>
                            </div>

                            <Button variant="outline" size="sm">
                              <Pencil size={16} />
                            </Button>
                          </div>
                        </div>
                      </CardAction>
                    </p>
                  ))}
                </ScrollArea>
              </ul>
            )}
          </CardContent>
        </Card>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Add Event</Button>
      </CardFooter>
    </Card>
  );
};

export default Home;
