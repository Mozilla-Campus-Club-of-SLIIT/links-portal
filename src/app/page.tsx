"use client"

import FoxAnimation from "@/components/FoxAnimation.tsx"
import ShortLink from "@/components/Shortlink"
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"

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
  {
    name: "join",
    redirect: "https://links.sliitmozilla.org/join",
    pinned: false,
    createdBy: "Seniru",
    description: "Join the SLIIT Mozilla Club",
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
      <FoxAnimation />
      <header className="sticky top-0 z-2 bg-white shadow-md p-3 py-5 mb-8">
        <div className="flex justify-between items-center">
          <img
            src="/assets/Mozilla-logo.png"
            alt="Mozilla Campus Club of SLIIT"
            width={100}
            height={50}
            className="mx-7"
          />
          {loggedIn ? (
            <div className="flex gap-5 items-center mx-7">
              <div className="flex gap-1 items-center">
                {user.image && (
                  <Image
                    src={user.image}
                    alt="Profile image"
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                )}

                <span className="text-gray-500 text-sm">Logged in as</span>
                <span className="text-sm">{user.name}</span>
              </div>
              <div>
                <button
                  className="border border-transparent bg-black text-white hover:bg-white hover:text-black hover:border-black transition px-3 py-2 rounded-lg cursor-pointer font-bold text-sm"
                  onClick={() => signOut()}
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-2 items-center mx-7">
              <button
                className="border border-transparent bg-black text-white hover:bg-white hover:text-black hover:border-black transition px-3 py-2 rounded-lg cursor-pointer font-bold text-sm"
                onClick={() => {
                  window.open("https://links.sliitmozilla.org/join", "_blank")
                }}
              >
                Join SLIIT Mozilla!
              </button>
              <button
                className="border border-transparent bg-black text-white hover:bg-white hover:text-black hover:border-black transition px-3 py-2 rounded-lg cursor-pointer font-bold text-sm"
                onClick={() => signIn("github")}
              >
                Login
              </button>
            </div>
          )}
        </div>
      </header>
      <section className="relative grid justify-start">
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
