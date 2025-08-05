import NextAuth from "next-auth"

const handler = NextAuth({

  providers: [],
  pages: {
    signIn: '/login',

  },
})

export { handler as GET, handler as POST }
