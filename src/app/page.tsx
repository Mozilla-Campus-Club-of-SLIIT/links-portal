"use client"

import FloatingSearch from "@/components/FloatingSearch"
import FoxAnimation from "@/components/FoxAnimation.tsx"
import ShortLink from "@/components/Shortlink"
import {
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons"
import { faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { createLink, getLinks } from "./actions"
import { useEffect, useState } from "react"
import Shortlink from "../../db/Link"

export default function Home() {
  const { data } = useSession()
  const user = data?.user
  const loggedIn = !!user
  const [links, setLinks] = useState<Shortlink[]>([])
  const [refreshFlag, setRefreshFlag] = useState<boolean>(false)

  useEffect(() => {
    const fetchLinks = async () => {
      setLinks(await getLinks())
    }
    fetchLinks()
  }, [refreshFlag])

  return (
    <main className="min-h-screen bg-gray-100">
      <FoxAnimation />
      <FloatingSearch />
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
                <span className="text-sm">{user.username}</span>
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
                onClick={() => (window.location.href = "/login")}
              >
                Login
              </button>
            </div>
          )}
        </div>
      </header>
      {loggedIn && (
        <form
          action={(formData: FormData) => createLink(data, formData)}
          className="relative z-1 m-10 w-200 bg-white p-6 rounded-xl shadow-md space-y-4 opacity-90"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Link name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="redirect" className="block text-sm font-medium text-gray-700">
              Redirect
            </label>
            <input
              type="url"
              name="redirect"
              id="redirect"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={3}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="mt-4 w-full border border-transparent rounded-md bg-black px-4 py-2 text-white hover:bg-white hover:text-black hover:border-black transition cursor-pointer"
          >
            Submit
          </button>
        </form>
      )}

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
            refreshFlag={refreshFlag}
            setRefreshFlag={setRefreshFlag}
          />
        ))}
      </section>

      <section>
        <div className="fixed top-50 right-85 bg-white shadow-md p-3 rounded-xl text-sm w-60 opacity-85 text-gray-500">
          🦊 Did you know?
        </div>
        <div className="fixed top-120 right-50 bg-white shadow-md p-3 rounded-xl text-sm w-60 opacity-85 text-gray-500">
          Foxes use Earth’s magnetic field to hunt!
        </div>
      </section>

      <footer className="relative bg-white py-12 z-2 mt-30 shadow-3xl">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <img src="/assets/Mozilla-logo.png" alt="Mozilla Logo" className="h-8 w-auto mb-2" />
              <h3 className="font-bold mb-4">Mozilla Campus Club of SLIIT</h3>
              <p className="text-sm text-gray-600">
                Empowering students through open source technology and innovation.
                <br />
                <b>#welovetech!</b> 🦊❤️
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="text-sm space-y-2">
                <p>SLIIT Malabe Campus</p>
                <p>New Kandy Road</p>
                <p>Malabe, Sri Lanka</p>
                <p>Email: infosliitmcc@gmail.com</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Follow Us on Socials!</h4>
              <div className="flex space-x-4">
                <Link href="https://www.facebook.com/sliitmcc" className="hover:text-primary">
                  <FontAwesomeIcon icon={faFacebook} className="h-5 w-5" />
                </Link>
                {/* <Link href="#" className="hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link> */}
                <Link href="https://www.instagram.com/sliitmozilla" className="hover:text-primary">
                  <FontAwesomeIcon icon={faInstagram} className="h-5 w-5" />
                </Link>
                <Link href="https://github.com/sliitmozilla" className="hover:text-primary">
                  <FontAwesomeIcon icon={faGithub} className="h-5 w-5" />
                </Link>
                <Link href="https://www.youtube.com/@sliitmozilla" className="hover:text-primary">
                  <FontAwesomeIcon icon={faYoutube} className="h-5 w-5" />
                </Link>
                <Link
                  href="https://www.linkedin.com/company/sliitmozilla/"
                  className="hover:text-primary"
                >
                  <FontAwesomeIcon icon={faLinkedin} className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
            © {new Date().getFullYear()} Mozilla Campus Club of SLIIT. Made with ❤️ by SLIIT
            Mozillians
          </div>
        </div>
      </footer>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed right-5 bottom-5 z-50 flex items-center justify-center w-12 h-12 rounded-full border bg-black text-white cursor-pointer hover:bg-white hover:text-black hover:border-black transition"
        aria-label="Back to top"
      >
        <FontAwesomeIcon icon={faChevronUp} />
      </button>
    </main>
  )
}
