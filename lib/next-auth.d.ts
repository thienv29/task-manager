import NextAuth, { DefaultSession } from 'next-auth';
declare module 'next-auth' {
  interface Session {
    user: any;
    accessToken: string;
    refreshToken: string;
  }

  interface CredentialsInputs {
    email: string;
    password: string;
  }
}
