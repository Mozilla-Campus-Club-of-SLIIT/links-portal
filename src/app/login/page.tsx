"use client"

import { signIn, useSession } from "next-auth/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faWarning } from "@fortawesome/free-solid-svg-icons"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Login() {
  const { data } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (data?.user) router.push("/")
  }, [data, router])

  if (data?.user) return null

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="grid bg-white p-8 rounded-xl shadow-md text-center space-y-6">
        <h3 className="text-2xl font-bold text-gray-800">Login</h3>
        <div className="flex items-center gap-2 font-sm text-gray-700">
          <FontAwesomeIcon icon={faWarning} className="w-4 h-4" />
          <p>This portal is for authorized SLIIT Mozilla Club members only.</p>
        </div>
        <hr />
        <button
          className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-md cursor-pointer hover:bg-gray-900 transition"
          onClick={() => signIn("github")}
        >
          <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
          <span>Login with GitHub</span>
        </button>
        <div className="text-sm text-gray-700">
          Not a member?{" "}
          <a
            href="https://links.sliitmozilla.org/join"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Join the club
          </a>
        </div>
      </div>
    </main>
  )
}
