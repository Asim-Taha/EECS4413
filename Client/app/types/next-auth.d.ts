import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      accessToken?: string;
    };
  }

  interface User {
    accessToken?: string;
  }
}
