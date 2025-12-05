"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { logOut } from "@/app/actions/authActions";
import { useRouter } from "next/navigation";
import EventCard from "@/components/EventCard";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const onClickSignOut = async () => {
    setIsLoading(true);
    let { error } = await logOut();
    if (error) {
      console.log("Error logging out:", error.message);
    } else {
      router.push("/login");
    }
    setIsLoading(false);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <EventCard editMode={false} />
    </div>
  );
}
