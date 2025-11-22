import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
   "https://kqjeheilkjsufafevpwl.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxamVoZWlsa2pzdWZhZmV2cHdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2OTIwMjksImV4cCI6MjA3OTI2ODAyOX0.1R80jG84gpe0ayp1ckxRTEHsjdWI9edCENRaIoaqkRg",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value }) => cookieStore.set(name, value))
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}