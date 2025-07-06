import { saveUserToDatabase } from '@/lib/database'
import { createGoogleSession } from '@/lib/session'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'



 export const authOptions : NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],

  // Dezactivează sesiunile automate
  session: {
    strategy: 'jwt',
    maxAge: 0, // Dezactivează sesiunile automate
  },

  // Dezactivează callback-urile automate pentru baza de date
  callbacks: {
    async signIn({ user, account, profile }) {
      // Aici salvezi doar ce vrei tu în baza ta de date
      try {
        // Exemplu: salvezi doar email-ul și numele
        
        await saveUserToDatabase({
          email: user.email,
          name: user.name,
          googleId: account?.providerAccountId,
          image: user.image, // ---------------------------- Aici o sa adaug si profile.email_verified cand o sa ma prind cum merge
          // Adaugi doar câmpurile pe care le vrei
        })

        await createGoogleSession(user.email!)
       

        // Returnează true pentru a permite sign-in
        return true
      } catch (error) {
        console.error('Eroare la salvare:', error)
        return false
      }
    },

    async jwt({ token, user, account }) {
      // Nu stoca sesiunea în JWT, doar informații minime pentru verificare
      if (account) {
        token.googleId = account.providerAccountId
      }
      return token
    },

    async session({ session, token }) {
      // Returnează o sesiune minimă sau goală
      return {
        user: {
          email: session.user?.email,
          googleId: token.googleId
        },
        expires: session.expires // Câmpul obligatoriu
      }
    }
  },

  // Configurează redirect-urile
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/auth/error',
  }
}

const handler = NextAuth(authOptions)
export  { handler as GET, handler as POST }
