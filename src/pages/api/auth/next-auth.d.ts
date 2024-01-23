
declare module 'next-auth' {
  interface Session {
    user: {
      uid: string;
      name: string;
    } & DefaultSession['user'];
  }
}