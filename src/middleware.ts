import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import jwt from 'jsonwebtoken';
import axios from 'axios';

// Function to verify Google access token
async function verifyGoogleAccessToken(token: string) {
  try {
    const response = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`);
    return response.data;
  } catch (error) {
    console.error('Google Token Verification Error:', error);
    throw new Error('Invalid Google token');
  }
}

export async function middleware(req: NextRequest) {
  // Get the token from the request
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
  if (!token) {
    const authHeader = req.headers.get('authorization');

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const bearerToken = authHeader.split(' ')[1];
      
      try {
        // Verify the token with your JWT secret or as a Google token
        let decoded;
        try {
          // First try verifying with your custom JWT secret
          decoded = jwt.verify(bearerToken, process.env.JWT_SECRET!);
        } catch (error) {
          // If custom JWT fails, try verifying as Google token
          decoded = await verifyGoogleAccessToken(bearerToken);
        }

        if (!decoded) {
          return NextResponse.redirect(new URL('/login', req.url));
        }

        // Token is valid, allow the request to proceed
        return NextResponse.next();
      } catch (error) {
        console.error('Token verification failed:', error);
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }
    
    // No valid token, redirect to login
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Allow access if token exists (valid NextAuth token)
  return NextResponse.next();
}

// Specify the routes that need protection
export const config = {
  matcher: [
    '/views/filters-label',
    '/views/inbox',
    '/views/today',
    '/views/upcoming',
    '/api/user',
    '/api/task'
  ],
};
