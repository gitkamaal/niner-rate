import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from '../../../../../mongodb';

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "login",
                },
            },
        }),
    ],
    secret: process.env.SECRET,
    callbacks: {
        async signIn({ user, account, profile }) {
            console.log(user, account, profile); // checking if data isnt coming back empty
            console.log(profile.given_name); // checking if data isnt coming back empty
            
            const client = await clientPromise;
            const db = client.db('niner-rate');
      
            const isAllowedToSignIn = user.email.endsWith('@uncc.edu') || user.email.endsWith('@charlotte.edu');

            if (!isAllowedToSignIn) {
              return false; // reject sign in
            }
      
            // Check if the user exists in the database
            const existingUser = await db.collection('users').findOne({ email: user.email });
      
            // If a new student signs in with the app, add them to the database
            if (!existingUser) {
              await db.collection('users').insertOne({
                email: user.email,
                firstName: profile.given_name, 
                lastName: profile.family_name, 
                image: user.image,
                userId: profile.sub,
                savedCourses: []
              });
            }
      
            return true;
        },
        async jwt({ token, user, profile }) {
            // If the user object is available, add the user ID to the token
            if (user) {
                console.log("JWT Callback - User: ", user);
                token.userId = user.id;
                token.firstName = profile?.given_name;

            }
            
            return token;
        },
        async session({ session, token }) {
            console.log("Session Callback - Session: ", session, "Token: ", token);

            if (token.sub) {
                session.user.id = token.userId;
            }
            if (token.firstName) {
                session.user.firstName = token.firstName; 
                console.log("Session Callback - updated Session: ", session);
            }
            
            return session;
        },
    },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }
