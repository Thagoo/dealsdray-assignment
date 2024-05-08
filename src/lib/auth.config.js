export const authConfig = {
  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.username = user.username;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        if (session.user) {
          session.user.id = token.id;
          session.user.username = token.username;
        }
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user?.username;
      const currentUrl = nextUrl.pathname;
      if (currentUrl == "/login") {
        if (isLoggedIn) {
          return Response.redirect(new URL("/", nextUrl));
        }
      }
      if (isLoggedIn) {
        return true;
      }
      return false;
    },
  },
  providers: [],
};
