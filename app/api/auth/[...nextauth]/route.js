import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import connectDB from "@/app/lib/db";
import userModel from "@/models/user.model";
import Business from "@/models/business.model";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        const user = await userModel.findOne({ email: credentials.email }).select('+password');

        if (!user) {

          const admin = await Business.findOne({ email: credentials.email }).select('+password');
          if (!admin) throw new Error("User not found");

          const isValid = await bcrypt.compare(credentials.password, admin.password);
          if (!isValid) throw new Error("Invalid password");

          return {
            id: admin._id.toString(),
            ownerName: admin.ownerName,
            businessName: admin.businessName,
            email: admin.email,
            role: admin.role,
            businessId: admin._id.toString(),
            emailVerified: admin.emailVerified || false,
          };

        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          businessName: user.businessName,
          businessId: user.business,
          emailVerified: true, // Staff/Admin users are already verified by default
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // On initial login, store user data in the token
      if (user) {
        token.id = user.id;                    // MongoDB _id for both user and business
        token.role = user.role;
        token.businessId = user.businessId;  // businessId for user and _id for business
        token.businessName = user.businessName;
        token.name = user.name;                // User's name
        token.ownerName = user.ownerName;      // Business owner's name
        token.emailVerified = user.emailVerified; // Email verification status
      }

      // For business owners, always check the database for the latest emailVerified status
      // This ensures that after verification, the token gets updated
      if (token.role === "Owner" && token.id) {
        try {
          await connectDB();
          const business = await Business.findById(token.id).select('emailVerified');
          if (business) {
            token.emailVerified = business.emailVerified;
          }
        } catch (error) {
          console.error("Error checking email verification:", error);
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id; // MongoDB _id for both user and business
      session.user.role = token.role;
      session.user.businessId = token.businessId; // businessId for user and _id for business
      session.user.businessName = token.businessName;
      session.user.name = token.name; // User's name
      session.user.ownerName = token.ownerName; // Business owner's name
      session.user.emailVerified = token.emailVerified; // Email verification status
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET, // required for JWT signing and verification
};

// export handler for API route
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };