import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../../firebase";


export const authOptions = {
    // Configure one or more authentication providers
    pages: {
        signIn: '/'
    },
    callbacks: {
        async jwt({ user, token }) {
          //   update token if user is returned
          if (user) {
            token.uid= user.uid;
    
          }
          //   return final_token
          return token;
        },
        async session({ session, token}) {
          //  update session from token
          session.uid= token.uid;
          return session;
        },
      },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials: any): Promise<any> {
                return await signInWithEmailAndPassword(auth, (credentials as any).email || '', (credentials as any).password || '')
                    .then(userCredential => {
                        console.log(userCredential.user)
                        if (userCredential.user) {
                            return { uid: userCredential.user.uid, email: userCredential.user.email };
                        }
                        return null;
                    })
                    .catch(error => (console.log(error)))
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(error);
                    });
            }
        })
    ],
}
export default NextAuth(authOptions)