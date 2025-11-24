"use server";

import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// Sign in with email and password
export async function signIn(email: string, password: string) {
  // Implementation for signing in a user
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.log("Sign-in error:", error);
  } else {
    console.log("Sign-in Successful:", data);
  }
  return { data, error };
}

// Sign up with email and password
export async function signUp(email: string, password: string) {
  // Implementation for signing up a user
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  return { data, error };
}

// Sign in with Google OAuth
export async function signInWithGoogle(): Promise<string> {
  const supabase = await createClient();
  const redirectTo = `${
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  }/auth/callback`;

  console.log("OAuth V2 redirect URL:", redirectTo);

  // Use the Supabase SDK to get the correct authorize URL
  // The SDK handles client_id, scopes, and provider configuration internally
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectTo,
    },
  });

  if (error) {
    console.error("OAuth error:", error);
    throw new Error(`OAuth failed: ${error.message}`);
  }

  if (!data?.url) {
    throw new Error("No authorization URL returned from Supabase");
  }

  console.log("OAuth V2 authorize URL:", data.url);

  // Return the URL so the client can redirect the browser to it
  return data.url;
}

// Log out
export async function logOut() {
  // Implementation for logging out a user
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log("Log-out error:", error);
  } else {
    console.log("Log-out Successful");
  }
  return { error };
}
