"use client";

import { useEffect, useState } from "react";
import { logOut } from "@/app/actions/authActions";
import { useRouter } from "next/navigation";
import SkelotonCard from "@/components/SkelotonCard";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import FastbreakSidebar from "@/components/FastbreakSidebar";
import { Sidebar } from "lucide-react";
import CalendarView from "@/components/CalendarView";
import Home from "@/components/Home";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState("Home");
  const [pageToRender, setPageToRender] = useState<JSX.Element>(
    <Home />
  );
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

  useEffect(() => {
    if (isLoading) {
      setPageToRender(
        <SkelotonCard />
      )
    } else {
      switch (currentPage) {
        case "Home":
          setPageToRender(<Home />);
          break;
        case "Events":
          setPageToRender(<CalendarView />);
          break;
        case "Settings":
          setPageToRender(<div className="p-4">Settings Page</div>);
          break;
      }
    }
  }, [currentPage]);

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="relative flex w-full">
        <div className="relative">
          <SidebarTrigger className="absolute top-2 right-0 translate-x-3/4 z-50" />
          <FastbreakSidebar onLogout={onClickSignOut} setCurrentPage={setCurrentPage} />
        </div>
        <main className="flex-1 flex items-center justify-center">
          <div className="w-screen h-screen flex items-center justify-center">
            {pageToRender}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
