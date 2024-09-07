import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If token doesn't exist, redirect to the login page
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next(); // Allow access if token exists
}

// Specify the routes that need protection
export const config = {
  matcher: ['/views/filters-label', '/views/inbox', '/views/today', '/views/upcoming', 
    '/api/user', '/api/task'], // Protect specific routes
};
