import { Calendar, Home, Inbox, List, Search, Settings, LogOut} from "lucide-react"
 
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
 
// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Events",
    url: "#",
    icon: List,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

function FastbreakSidebar({onLogout, setCurrentPage}: {onLogout: () => void, setCurrentPage: Dispatch<SetStateAction<string>>}) {
  const onButtonClick = (title: string) => {
    setCurrentPage(title);
  }

  return (
    <Sidebar >
        <SidebarHeader className="flex items-center justify-between">
          <img
          
            src="/Fastbreak_Ai_Logo.jpg"
            alt="Fastbreak AI Logo"
            className=""
          />
        </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton onClick={() => onButtonClick(item.title)} asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button onClick={onLogout} variant="destructive" className="w-full">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}

export default FastbreakSidebar