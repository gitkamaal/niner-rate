import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";


export const authOptions = {
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
        async signIn({ user, account }) {
            console.log(user, account); // checking if data isnt coming back empty
            const isAllowedToSignIn = user.email.endsWith('@uncc.edu') || user.email.endsWith('@charlotte.edu');
            if (isAllowedToSignIn) {
                return true;
            } else {
                return false; 
            }
        },
    },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }
