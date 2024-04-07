
import 'next-auth';

declare module 'next-auth' {
  /**
   This file is used to extend the built-in next-auth session types to include the custom properties
   added in the session callback.
   */
  interface Session {
    user: {
      id: string;
      name?: string;
      email?: string;
      image?: string;
      firstName?: string;
    }
  }

  
}