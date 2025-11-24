"use client";   

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { logOut } from "@/app/actions/authActions";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const onClickSignOut = async () => {
        setIsLoading(true);
        let { error } = await logOut();
        if(error) {
            console.log("Error logging out:", error.message);
        }else{
            router.push("/login");
        }
        setIsLoading(false);
    }
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <Button onClick={onClickSignOut} variant="destructive">Sign out </Button>
        </div>
    );
}