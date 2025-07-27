import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

const clientId = process.env.GITHUB_ID
const clientSecret = process.env.GITHUB_SECRET

if (!clientId || !clientSecret)
  throw new Error("clientId or clientSecret missing in .env configuration")

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId,
      clientSecret,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // todo: allow sign in based on organization access
      return true
    },

    async jwt({ token, profile }) {
      if (profile) {
        const githubProfile = profile as { login: string }
        token.login = githubProfile.login
      }
      return token
    },

    async session({ session, token }) {
      if (token?.login) {
        session.user.username = token.login
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }
