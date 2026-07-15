import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { authService } from '@/services/auth.service'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    //für Demo User
    Credentials({
      credentials: {
        email: { label: 'E-Mail', type: 'email' },
        password: { label: 'Passwort', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        return authService.login(
          credentials.email as string,
          credentials.password as string,
        )
      },
    }),

    {
      id: 'ovsv-sso',
      name: 'ÖVSV SSO',
      type: 'oidc',
      issuer: process.env.SSO_ISSUER,
      clientId: process.env.SSO_CLIENT_ID,
      clientSecret: process.env.SSO_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          externalId: profile.sub,
          email: profile.email,
          name: `${profile.given_name} ${profile.family_name}`,
          callSign: profile.callsign ?? null,
        }
      },
    },
  ],
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' },
  callbacks: {
    async signIn({ user, account }) {
    if (account?.provider === 'ovsv-sso' && user.id) {
      await authService.findOrCreateSSOUser({
        externalId: user.id,
        email: user.email ?? null,
        name: user.name ?? null,
        callSign: (user as any).callSign ?? null,
      })
    }
    return true
  },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
        token.id = (user as any).id
        token.externalId = (user as any).externalId
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
        session.user.id = token.id as string
      }
      return session
    },
  },
})