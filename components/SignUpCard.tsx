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
import { useRouter } from "next/navigation";
import { signUp, signInWithGoogle } from "@/app/actions/authActions";
import { set } from "zod";

function SignUpCard() {
  const [isEmailLoading, setIsEmailLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Email OTP submission handler
  async function onSubmit() {
    setIsEmailLoading(true);

    let formData = form.getValues();
    let { data, error } = await signUp(formData.email, formData.password)

    if(error) {
        console.log("Error signing up:", error.message);
    }
    else{
        console.log("Sign up successful:", data);
    }

    setIsEmailLoading(false);
  }

  // Google OAuth submission handler
  async function onSubmitGoogle() {
    setIsGoogleLoading(true);
    try {
      const authUrl = await signInWithGoogle();
      // Redirect the browser to the authorization URL
        router.push(authUrl);
    } catch (error) {
      console.error("OAuth failed:", error);
    }

    setTimeout(() => {
      setIsGoogleLoading(false);
    }, 3000);
  }

  // Navigate to Log In button handler
  const onClickLogIn = () => {
    router.push("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="flex justify-center">
            Sign Up for an account
          </CardTitle>
          <CardDescription className="flex justify-center">
            Enter you name and email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form>
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="pt-4">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="pt-4">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="pt-4">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button
            onClick={onSubmit}
            disabled={isEmailLoading || isGoogleLoading}
            className="w-full"
          >
            {isEmailLoading && <LoaderIcon className="animate-spin" />}
            Create Account
          </Button>
          <div className="relative">
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background text-muted-foreground px-2">
                Or
              </span>
            </div>
          </div>
          <Button
            onClick={onSubmitGoogle}
            variant="outline"
            type="button"
            disabled={isGoogleLoading || isEmailLoading}
            className="w-full"
          >
            {isGoogleLoading ? (
              <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <img src="/google.svg.png" alt="Google" width={18} height={18} />
            )}{" "}
            Sign Up with Google
          </Button>
          <div className="mt-8 text-center text-sm">
            Already have an account?{" "}
            <Button variant="link" onClick={onClickLogIn}>
              Log In
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SignUpCard;
