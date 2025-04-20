import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get('sb-access-token')

  // Appliquer la sécurité uniquement sur /gallery/*
  if (request.nextUrl.pathname.startsWith('/gallery')) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/gallery/:path*'],
}