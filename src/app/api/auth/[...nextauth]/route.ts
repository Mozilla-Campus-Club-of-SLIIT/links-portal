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
})

export { handler as GET, handler as POST }
