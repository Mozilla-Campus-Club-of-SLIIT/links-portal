"use client"

import ShortLink from "@/components/Shortlink"
import { signOut, useSession } from "next-auth/react"

const links = [
  {
    name: "github",
    redirect: "http://github.com",
    pinned: true,
    createdBy: "Seniru",
    description: "Official GitHub repository for SLIIT Mozilla Club",
    views: 0,
  },
  {
    name: "discord",
    redirect: "https://discord.gg/sliitmozilla",
    pinned: true,
    createdBy: "Seniru",
    description: "Join our Discord server for discussions and events",
    views: 0,
  },
  {
    name: "website",
    redirect: "https://sliitmozilla.org",
    pinned: true,
    createdBy: "Seniru",
    description: "Official website of SLIIT Mozilla Club",
    views: 0,
  },
  {
    name: "join",
    redirect: "https://links.sliitmozilla.org/join",
    pinned: false,
    createdBy: "Seniru",
    description: "Join the SLIIT Mozilla Club",
    views: 0,
  },
]

export default function Home() {
  const { data } = useSession()
  const user = data?.user
  const loggedIn = !!user

  return (
    <main className="min-h-screen bg-gray-100">
      <header>
        <h3>Mozilla Campus Club of SLIIT</h3>
        <button onClick={() => signOut()}>Log out</button>
      </header>
      <section className="grid justify-center">
        {links.map((link, index) => (
          <ShortLink
            key={index}
            name={link.name}
            redirect={link.redirect}
            pinned={link.pinned}
            createdBy={link.createdBy}
            description={link.description}
            views={link.views}
            user={user}
            loggedIn={loggedIn}
          />
        ))}
      </section>
    </main>
  )
}
