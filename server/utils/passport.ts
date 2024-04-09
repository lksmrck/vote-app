import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      //   callbackURL: "/auth/google/login/callback",
      callbackURL: "http://localhost:3000/auth/google/login/callback",
    },
    async (accessToken, refreshToken, profile, callback) => {
      const user = await prisma.user.findUnique({
        where: {
          email: profile.emails![0].value,
        },
      });
      console.log("USER FOUND IN DB", user);
      if (!user) {
        await prisma.user.create({
          data: {
            id: profile.id,
            name: profile.displayName,
            email: profile.emails![0].value,
          },
        });
        console.log("CREATING NEW USER IN DB");
      }

      callback(null, profile);
    }
  )
);

// session handling
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser(async (user, cb) => {
  cb(null, user!);
});
