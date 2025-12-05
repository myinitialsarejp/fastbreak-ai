import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
    console.log("=== Auth Callback Route ===")
    console.log("Full request headers:", Object.fromEntries(request.headers))
    console.log("Request URL:", request.url)
  
  const { searchParams, origin } = new URL(request.url)

  console.log("Auth callback search params:", searchParams.toString());
  console.log("Auth callback origin:", origin);
  
  // Try to extract code from search params first
  let code = searchParams.get('code')
  
    
  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get('next') ?? '/'
  if (!next.startsWith('/')) {
    // if "next" is not a relative URL, use the default
    next = '/'
  }
  
  if (code) {
    try {
      const supabase = await createClient()
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (!error) {
        console.log("Session exchange successful")
        const forwardedHost = request.headers.get('x-forwarded-host')
        const isLocalEnv = process.env.NODE_ENV === 'development'
        if (isLocalEnv) {
          return NextResponse.redirect(`${origin}${next}`)
        } else if (forwardedHost) {
          return NextResponse.redirect(`https://${forwardedHost}${next}`)
        } else {
          return NextResponse.redirect(`${origin}${next}`)
        }
      } else {
        console.log("Session exchange error:", error)
      }
    } catch (err) {
      console.log("Exception during exchange:", err)
    }
  } else {
    console.log("No code found in request — Supabase may have already set session via cookies")
  }
  
  // Fallback: redirect to app home or error page
  // If Supabase already set cookies, middleware will detect the session
  const forwardedHost = request.headers.get('x-forwarded-host')
  const isLocalEnv = process.env.NODE_ENV === 'development'
  if (isLocalEnv) {
    return NextResponse.redirect(`${origin}${next}`)
  } else if (forwardedHost) {
    return NextResponse.redirect(`https://${forwardedHost}${next}`)
  } else {
    return NextResponse.redirect(`${origin}${next}`)
  }
}