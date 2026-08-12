"use client"

import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faRightToBracket, faSpinner } from "@fortawesome/free-solid-svg-icons"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // TODO: This is where the team member will integrate the Supabase Edge Function
    // Example: await fetch('/api/auth', { method: 'POST', body: JSON.stringify({ email, password }) })
    
    setTimeout(() => {
      setIsLoading(false)
      alert("Login integration pending (Issue #1)")
    }, 1000)
  }

  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col justify-center items-center bg-gradient-animation px-4">
      {/* Animated background elements */}
      <div className="background-animation">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
        <div className="circle circle-4"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <a href="/" className="inline-flex items-center text-gray-700 hover:text-orange-600 mb-6 transition-colors font-medium">
          <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4 mr-2" />
          Back to Portal
        </a>

        {/* Orange shadow background */}
        <div className="absolute mt-12 inset-0 bg-orange-500 rounded-2xl transform translate-x-2 translate-y-2 h-[420px]"></div>

        <div className="relative bg-white border-2 border-black rounded-2xl p-8 shadow-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-black mb-2">Admin Access</h1>
            <p className="text-gray-600 text-sm">Sign in with your SLIIT Mozilla credentials to manage short links.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-0 transition-colors outline-none text-black"
                placeholder="you@sliitmozilla.org"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-0 transition-colors outline-none text-black"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black hover:bg-gray-900 text-white font-bold py-3 px-4 rounded-xl transition-colors mt-4 flex items-center justify-center disabled:opacity-70"
            >
              {isLoading ? (
                <FontAwesomeIcon icon={faSpinner} className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <FontAwesomeIcon icon={faRightToBracket} className="w-5 h-5 mr-2" />
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
