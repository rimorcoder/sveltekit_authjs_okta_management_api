import { SvelteKitAuth } from "@auth/sveltekit"
import Okta from "@auth/core/providers/okta";

// Extend the User type
declare module "@auth/core/types" {
  interface User {
    accessToken?: string;
    id_token?: string; // Add this line
  }
}

//https://authjs.dev/getting-started/authentication/oauth
export const { handle, signIn, signOut } = SvelteKitAuth({
  trustHost: true,
  providers: [ Okta({ authorization: { params: { scope: "openid email profile okta.logs.read" } } })],
  callbacks: {
    //https://authjs.dev/guides/extending-the-session
    async jwt({ token, user, account }) {
      if (user) { 
        token.id = user.id
      }
      if(account) {
        token.accessToken = account.access_token
        token.id_token = account.id_token
      }
      return token
    },
    async session({ session, token }) {
      if (typeof token.id === 'string') {
        session.user.id = token.id;
      }
      if (typeof token.accessToken === 'string') {
        session.user.accessToken = token.accessToken;
      }
      if (typeof token.id_token === 'string') {
        session.user.id_token = token.id_token;
      }
      return session;
    },
  }
}) 
