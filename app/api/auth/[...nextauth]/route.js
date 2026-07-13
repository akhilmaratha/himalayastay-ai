import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectToDatabase from "../../../../src/lib/mongodb";
import User from "../../../../src/models/User";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "dummy_client_id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "dummy_client_secret",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        await connectToDatabase();
        let existingUser = await User.findOne({ email: user.email });
        
        if (!existingUser) {
          // Check if this is the first user
          const userCount = await User.countDocuments();
          const role = userCount === 0 ? "admin" : "user";
          
          existingUser = await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            provider: "google",
            role: role,
          });
        }
        
        user.role = existingUser.role;
        user.id = existingUser._id.toString();
        return true;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
