"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { LoaderIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import Link from "next/link";
  

function LoginCard() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm({
    defaultValues: {
      email: "",
    },
  });

  // Email OTP submission handler
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  // Google OAuth submission handler
  async function onSubmitGoogle() {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="flex justify-center">Login to your account</CardTitle>
          <CardDescription className = "flex justify-center">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form>
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        
                      <Input placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button onClick={onSubmit} disabled={isLoading} className="w-full">
            {isLoading && <LoaderIcon className="animate-spin" />}
            Sign In with Email
          </Button>
          <div className="relative">
            
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background text-muted-foreground px-2">
                Or continue with
              </span>
            </div>
          </div>
          <Button
            onClick={onSubmitGoogle}
            variant="outline"
            type="button"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <img src="/google.svg.png" alt="Google" width={18} height={18} />
            )}{" "}
            Google
          </Button>
          <div className="mt-8 text-center text-sm">
            Don't have an account?{' '}
            <Button variant="link"><Link href="/signup">Sign Up</Link></Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LoginCard;
