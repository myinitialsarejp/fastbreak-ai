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
import { signIn, signInWithGoogle, signInWithGoogleV2 } from "@/app/actions/authActions";

function LoginCard() {
  const [isEmailLoading, setIsEmailLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Email OTP submission handler
  async function onSubmit() {
    setIsEmailLoading(true);
    const formData = form.getValues();
    const { data, error } = await signIn(formData.email, formData.password);
    if (error) {
      console.log("Error signing in:", error.message);
    } else {
      router.push("/");
    }
    setIsEmailLoading(false);
  }

  // Google OAuth submission handler
  async function onSubmitGoogle() {
    setIsGoogleLoading(true);
    try {
      const authUrl = await signInWithGoogleV2();
      // Redirect the browser to the authorization URL
        router.push(authUrl);
    } catch (error) {
      console.error("OAuth failed:", error);
    }
          setIsGoogleLoading(false);

  }

  // Sign Up button handler
  function onClickSignUp() {
    router.push("/signup");
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="flex justify-center">
            Login to your account
          </CardTitle>
          <CardDescription className="flex justify-center">
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
                      <Input
                        type="password"
                        placeholder="Your password"
                        {...field}
                      />
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
            disabled={isEmailLoading}
            className="w-full"
          >
            {isEmailLoading && <LoaderIcon className="animate-spin" />}
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
            disabled={isGoogleLoading}
            className="w-full"
          >
            {isGoogleLoading ? (
              <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <img src="/google.svg.png" alt="Google" width={18} height={18} />
            )}{" "}
            Google
          </Button>
          <div className="mt-8 text-center text-sm">
            Don't have an account?{" "}
            <Button variant="link" onClick={onClickSignUp}>
              Sign Up
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LoginCard;
